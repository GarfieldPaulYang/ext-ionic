"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const ionic_angular_1 = require("ionic-angular");
const device_1 = require("@ionic-native/device");
const _ = require("lodash");
const config_1 = require("../config/config");
const dialog_1 = require("../utils/dialog");
const util_1 = require("../utils/util");
const response_result_1 = require("../utils/http/response/response-result");
const url_params_builder_1 = require("../utils/http/url-params-builder");
exports.ticket_expired = 'ticket-expired';
class HttpProviderOptions extends http_1.RequestOptions {
    constructor(options) {
        super(options);
        this.showErrorAlert = true;
        this.interceptors = [];
        this.interceptorParams = {};
        this.showLoading = options.showLoading;
        this.loadingContent = options.loadingContent;
        this.showErrorAlert = options.showErrorAlert;
    }
    merge(options) {
        let result = super.merge(options);
        result.showLoading = this.showLoading;
        result.showErrorAlert = this.showErrorAlert;
        result.interceptors = this.interceptors;
        result.interceptorParams = this.interceptorParams;
        if (util_1.isPresent(options.showLoading)) {
            result.showLoading = options.showLoading;
        }
        if (util_1.isPresent(options.loadingContent)) {
            result.loadingContent = options.loadingContent;
        }
        if (util_1.isPresent(options.showErrorAlert)) {
            result.showErrorAlert = options.showErrorAlert;
        }
        if (util_1.isPresent(options.interceptors)) {
            result.interceptors = options.interceptors;
        }
        if (util_1.isPresent(options.interceptorParams)) {
            result.interceptorParams = options.interceptorParams;
        }
        return result;
    }
}
exports.HttpProviderOptions = HttpProviderOptions;
const defaultRequestOptions = new HttpProviderOptions({
    showLoading: true,
    loadingContent: '正在加载...',
    showErrorAlert: true,
    method: http_1.RequestMethod.Get,
    responseType: http_1.ResponseContentType.Json
});
let HttpProvider = class HttpProvider {
    constructor(_http, config, dialog) {
        this._http = _http;
        this.config = config;
        this.dialog = dialog;
    }
    get http() {
        return this._http;
    }
    requestWithError(url, options) {
        if (!util_1.isPresent(options.showErrorAlert)) {
            options.showErrorAlert = true;
        }
        return this.request(url, options).then((result) => {
            if (result.status === 1) {
                if (options.showErrorAlert) {
                    this.dialog.alert('系统提示', result.msg);
                }
                if (util_1.isPresent(result.data) && !_.isEqual({}, result.data)) {
                    return Promise.reject(result);
                }
                return Promise.reject(result.msg);
            }
            return result.data;
        }).catch(err => {
            return Promise.reject(err);
        });
    }
    request(url, options) {
        options = _.isUndefined(options) ? defaultRequestOptions : defaultRequestOptions.merge(options);
        options.interceptors = this.config.get().interceptors.concat(options.interceptors);
        let loading;
        if (options.showLoading) {
            loading = this.dialog.loading(options.loadingContent);
            loading.present();
        }
        options.interceptors.forEach(interceptor => {
            interceptor.before(options);
        });
        return this.ajax(url, options).toPromise().then(result => {
            if (loading)
                loading.dismiss();
            options.interceptors.forEach(interceptor => {
                interceptor.successed(options, result);
            });
            return result;
        }).catch(err => {
            if (loading)
                loading.dismiss();
            options.interceptors.forEach(interceptor => {
                interceptor.failed(options, err);
            });
            return Promise.reject(err);
        });
    }
    ajax(url, options) {
        if (!util_1.isPresent(options.headers)) {
            options.headers = new http_1.Headers();
        }
        options.headers.set('__cors-request__', 'true');
        if (options.method === http_1.RequestMethod.Post && util_1.isPresent(options.body) && !(options.body instanceof FormData)) {
            options.body = _.isString(options.body) ? options.body : JSON.stringify(options.body);
        }
        return this.http.request(url, options).map((r) => new response_result_1.ResponseResult(r.json()));
    }
};
HttpProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, config_1.ConfigProvider, dialog_1.Dialog])
], HttpProvider);
exports.HttpProvider = HttpProvider;
let CorsHttpProvider = class CorsHttpProvider {
    constructor(http, events, config, device) {
        this.http = http;
        this.events = events;
        this.config = config;
        this.device = device;
        this._ticket = null;
    }
    get ticket() {
        return this._ticket;
    }
    set ticket(t) {
        this._ticket = t;
    }
    login(options) {
        return this.request(this.config.get().login.url, {
            headers: new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                '__login__': 'true',
                '__uuid__': this.device.uuid,
                '__model__': this.device.model
            }),
            method: http_1.RequestMethod.Post,
            showErrorAlert: false,
            body: url_params_builder_1.URLParamsBuilder.build(options).toString()
        });
    }
    logout() {
        return this.request(this.config.get().login.url, {
            headers: new http_1.Headers({
                '__logout__': 'true'
            })
        }).then(result => {
            this.ticket = null;
            return result;
        });
    }
    request(url, options) {
        if (_.isUndefined(options)) {
            options = {};
        }
        if (!util_1.isPresent(options.headers)) {
            options.headers = new http_1.Headers();
        }
        options.headers.set('__app-key__', this.config.get().login.appKey);
        options.headers.set('__dev-mode__', this.config.get().devMode + '');
        options.headers.set('__ticket__', this.ticket);
        return this.http.requestWithError(url, options).then(result => {
            return result;
        }).catch(err => {
            if (err && _.isString(err) && err.toString() === exports.ticket_expired) {
                this.events.publish(exports.ticket_expired);
            }
            return Promise.reject(err);
        });
    }
};
CorsHttpProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpProvider,
        ionic_angular_1.Events,
        config_1.ConfigProvider,
        device_1.Device])
], CorsHttpProvider);
exports.CorsHttpProvider = CorsHttpProvider;
//# sourceMappingURL=http.js.map