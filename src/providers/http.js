"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var ionic_angular_1 = require('ionic-angular');
var _ = require('lodash');
var config_1 = require('../config/config');
var dialog_1 = require('../utils/dialog');
var util_1 = require('../utils/util');
var response_result_1 = require('../utils/http/response/response-result');
var url_params_builder_1 = require('../utils/http/url-params-builder');
var ticket_expired = 'ticket_expired';
var HttpProviderOptions = (function (_super) {
    __extends(HttpProviderOptions, _super);
    function HttpProviderOptions(options) {
        _super.call(this, options);
        this.showLoading = options.showLoading;
    }
    HttpProviderOptions.prototype.merge = function (options) {
        var result = _super.prototype.merge.call(this, options);
        result.showLoading = this.showLoading;
        if (util_1.isPresent(options.showLoading)) {
            result.showLoading = options.showLoading;
        }
        return result;
    };
    return HttpProviderOptions;
}(http_1.RequestOptions));
exports.HttpProviderOptions = HttpProviderOptions;
var defaultRequestOptions = new HttpProviderOptions({
    showLoading: true,
    method: http_1.RequestMethod.Get,
    responseType: http_1.ResponseContentType.Json
});
var HttpProvider = (function () {
    function HttpProvider(_http, dialog) {
        this._http = _http;
        this.dialog = dialog;
    }
    Object.defineProperty(HttpProvider.prototype, "http", {
        get: function () {
            return this._http;
        },
        enumerable: true,
        configurable: true
    });
    HttpProvider.prototype.requestWithError = function (url, options) {
        var _this = this;
        return this.request(url, options).then(function (result) {
            if (result.status === 1) {
                _this.dialog.alert('系统提示', result.msg);
                if (util_1.isPresent(result.data)) {
                    return result.data;
                }
                return Promise.reject(result.msg);
            }
            return result.data;
        });
    };
    HttpProvider.prototype.request = function (url, options) {
        var loading;
        if (options.showLoading) {
            loading = this.dialog.loading('正在加载...');
            loading.present();
        }
        return this.ajax(url, options).toPromise().then(function (result) {
            if (loading)
                loading.dismiss();
            return result;
        }, function (reason) {
            if (loading)
                loading.dismiss();
            return reason;
        });
    };
    HttpProvider.prototype.ajax = function (url, options) {
        options = _.isUndefined(options) ? defaultRequestOptions : defaultRequestOptions.merge(options);
        if (options.method === http_1.RequestMethod.Post && util_1.isPresent(options.body) && !(options.body instanceof FormData)) {
            options.body = _.isString(options.body) ? options.body : JSON.stringify(options.body);
        }
        return this.http.request(url, options).map(function (r) { return new response_result_1.ResponseResult(r.json()); });
    };
    HttpProvider.decorators = [
        { type: core_1.Injectable },
    ];
    HttpProvider.ctorParameters = [
        { type: http_1.Http, },
        { type: dialog_1.Dialog, },
    ];
    return HttpProvider;
}());
exports.HttpProvider = HttpProvider;
var CorsHttpProvider = (function () {
    function CorsHttpProvider(http, events, config) {
        this.http = http;
        this.events = events;
        this.config = config;
        this._ticket = null;
    }
    Object.defineProperty(CorsHttpProvider.prototype, "ticket", {
        get: function () {
            return this._ticket;
        },
        set: function (t) {
            this._ticket = t;
        },
        enumerable: true,
        configurable: true
    });
    CorsHttpProvider.prototype.login = function (options) {
        return this.request(this.config.get().login.url, {
            headers: new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
            method: http_1.RequestMethod.Post,
            body: url_params_builder_1.URLParamsBuilder.build(options).toString(),
            search: url_params_builder_1.URLParamsBuilder.build({ __login__: true })
        });
    };
    CorsHttpProvider.prototype.logout = function () {
        var _this = this;
        var search = url_params_builder_1.URLParamsBuilder.build({ '__logout__': true });
        return this.request(this.config.get().login.url, { search: search }).then(function (result) {
            _this.ticket = null;
            return result;
        });
    };
    CorsHttpProvider.prototype.request = function (url, options) {
        var _this = this;
        var search = url_params_builder_1.URLParamsBuilder.build({
            'appKey': this.config.get().login.appKey,
            'devMode': this.config.get().devMode,
            '__ticket__': this.ticket,
            '__cors-request__': true
        });
        if (_.isUndefined(options)) {
            options = {};
        }
        if (_.has(options, 'search')) {
            search.setAll(options.search);
        }
        return this.http.requestWithError(url, _.assign({}, options, { search: search })).then(function (result) {
            if (result && _.isString(result) && result.toString() === ticket_expired) {
                _this.events.publish(ticket_expired);
                return ticket_expired;
            }
            return result;
        });
    };
    CorsHttpProvider.decorators = [
        { type: core_1.Injectable },
    ];
    CorsHttpProvider.ctorParameters = [
        { type: HttpProvider, },
        { type: ionic_angular_1.Events, },
        { type: config_1.ConfigProvider, },
    ];
    return CorsHttpProvider;
}());
exports.CorsHttpProvider = CorsHttpProvider;
//# sourceMappingURL=http.js.map