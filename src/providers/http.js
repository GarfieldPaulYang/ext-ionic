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
const string_1 = require("../utils/string");
const json_file_storage_1 = require("./file-storage/json-file-storage");
exports.ticket_expired = 'ticket-expired';
class HttpProviderOptions extends http_1.RequestOptions {
    constructor(options) {
        super(options);
        this.showLoading = options.showLoading;
        this.loadingContent = options.loadingContent;
        this.showErrorAlert = options.showErrorAlert;
        this.cache = options.cache;
        this.cacheOnly = options.cacheOnly;
    }
    merge(options) {
        let result = super.merge(options);
        result.showLoading = util_1.isPresent(options.showLoading) ? options.showLoading : this.showLoading;
        result.showErrorAlert = util_1.isPresent(options.showErrorAlert) ? options.showErrorAlert : this.showErrorAlert;
        result.loadingContent = options.loadingContent ? options.loadingContent : this.loadingContent;
        result.cache = util_1.isPresent(options.cache) ? options.cache : this.cache;
        result.cacheOnly = util_1.isPresent(options.cacheOnly) ? options.cacheOnly : this.cacheOnly;
        return result;
    }
}
exports.HttpProviderOptions = HttpProviderOptions;
const defaultRequestOptions = new HttpProviderOptions({
    showLoading: true,
    loadingContent: '正在加载...',
    showErrorAlert: true,
    cache: true,
    cacheOnly: false,
    method: http_1.RequestMethod.Get,
    responseType: http_1.ResponseContentType.Json
});
const APP_JSON_TYPE = 'application/json';
let HttpProvider = class HttpProvider {
    constructor(_http, jsonCache, config, dialog) {
        this._http = _http;
        this.jsonCache = jsonCache;
        this.config = config;
        this.dialog = dialog;
    }
    get http() {
        return this._http;
    }
    requestWithError(url, options, foundCacheCallback = (result) => { }) {
        options = options ? defaultRequestOptions.merge(options) : defaultRequestOptions;
        let innerRequest = (url, options) => {
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
                if (options.cache && options.method === http_1.RequestMethod.Get && cacheKey) {
                    this.jsonCache.save(cacheKey, result.data);
                }
                return result.data;
            }).catch(err => {
                return Promise.reject(err);
            });
        };
        let cacheKey;
        if (options.cache && options.method === http_1.RequestMethod.Get) {
            cacheKey = this.hashUrl(url, (options.params || options.search));
            if (options.cacheOnly) {
                return this.jsonCache.load(cacheKey).catch(_ => { return innerRequest(url, options); });
            }
            this.jsonCache.load(cacheKey).then(result => {
                foundCacheCallback(result);
            }).catch(error => console.log(error));
        }
        return innerRequest(url, options);
    }
    request(url, options) {
        options = options || defaultRequestOptions;
        let loading;
        if (options.showLoading) {
            loading = this.dialog.loading(options.loadingContent);
            loading.present();
        }
        return this.ajax(url, options).toPromise().then(result => {
            if (loading)
                loading.dismiss();
            return result;
        }).catch(err => {
            if (loading)
                loading.dismiss();
            return Promise.reject(err);
        });
    }
    ajax(url, options) {
        options = options || defaultRequestOptions;
        let params = url_params_builder_1.URLParamsBuilder.build({ '__cors-request__': true });
        if (options.search) {
            params.replaceAll(options.search);
        }
        if (options.params) {
            params.replaceAll(options.params);
        }
        options.params = params;
        if (options.method === http_1.RequestMethod.Post) {
            options.body = options.body || {};
            options.headers = options.headers || new http_1.Headers();
            let contentType = options.headers.get('Content-Type');
            if (!contentType) {
                contentType = APP_JSON_TYPE;
                options.headers.set('Content-Type', contentType);
            }
            if (!_.isString(options.body) && !(options.body instanceof FormData)) {
                if (APP_JSON_TYPE === contentType.toLowerCase()) {
                    options.body = JSON.stringify(options.body);
                }
                else {
                    options.body = url_params_builder_1.URLParamsBuilder.build(options.body).toString();
                }
            }
        }
        return this.http.request(url, options).map((r) => new response_result_1.ResponseResult(r.json()));
    }
    hashUrl(url, params) {
        let q = params ? params.toString() : '';
        return string_1.StringUtils.hash(url + q).toString();
    }
};
HttpProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        json_file_storage_1.JsonFileStorage,
        config_1.ConfigProvider,
        dialog_1.Dialog])
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
    get httpProvider() {
        return this.http;
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
            body: options
        });
    }
    logout() {
        return this.request(this.config.get().login.url, {
            cache: false,
            headers: new http_1.Headers({
                '__logout__': 'true'
            })
        }).then(result => {
            this.ticket = null;
            return result;
        });
    }
    request(url, options, foundCacheCallback = (result) => { }) {
        options = options || {};
        options.headers = options.headers || new http_1.Headers();
        options.headers.set('__app-key__', this.config.get().login.appKey);
        options.headers.set('__dev-mode__', this.config.get().devMode + '');
        options.headers.set('__ticket__', this.ticket);
        return this.http.requestWithError(url, options, foundCacheCallback).then(result => {
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