"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var ionic_angular_1 = require('ionic-angular');
var lodash_1 = require('lodash');
var config_1 = require('../../config/config');
var dialog_1 = require('../dialog');
var response_result_1 = require('./response/response-result');
var url_params_builder_1 = require('./url-params-builder');
var ticket_expired = 'ticket_expired';
var HttpProviderOptions = (function (_super) {
    __extends(HttpProviderOptions, _super);
    function HttpProviderOptions(options) {
        _super.call(this, options);
        this.showLoading = options.showLoading;
    }
    HttpProviderOptions.prototype.merge = function (options) {
        var result = _super.prototype.merge.call(this, options);
        result.showLoading = options.showLoading;
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
        return new Promise(function (resolve, reject) {
            _this.request(url, options).then(function (result) {
                if (result.status == 1) {
                    _this.dialog.alert('系统提示', result.msg);
                    return;
                }
                resolve(result.data);
            }, function (reason) {
                reject(reason);
            });
        });
    };
    HttpProvider.prototype.request = function (url, options) {
        var _this = this;
        options = lodash_1.isUndefined(options) ? defaultRequestOptions : defaultRequestOptions.merge(options);
        var loading;
        if (options.showLoading) {
            loading = this.dialog.loading('正在加载...');
            loading.present();
        }
        return new Promise(function (resolve, reject) {
            _this.http.request(url, options).map(function (r) { return new response_result_1.ResponseResult(r.json()); }).toPromise().then(function (result) {
                if (loading)
                    loading.dismiss();
                resolve(result);
            }, function (reason) {
                if (loading)
                    loading.dismiss();
                reject(reason);
            }).catch(function (reason) {
                if (loading)
                    loading.dismiss();
                reject(reason);
            });
        });
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
    }
    Object.defineProperty(CorsHttpProvider.prototype, "ticket", {
        set: function (t) {
            this._ticket = t;
        },
        enumerable: true,
        configurable: true
    });
    CorsHttpProvider.prototype.login = function (options) {
        var search = url_params_builder_1.URLParamsBuilder.build(options);
        search.set('__login__', 'true');
        return this.request(this.config.login.url, { search: search });
    };
    CorsHttpProvider.prototype.logout = function () {
        var _this = this;
        var search = url_params_builder_1.URLParamsBuilder.build({ '__logout__': true });
        return this.request(this.config.login.url, { search: search }).then(function (result) {
            _this._ticket = null;
            return result;
        }, function (reason) {
            return reason;
        });
    };
    CorsHttpProvider.prototype.request = function (url, options) {
        var _this = this;
        var search = url_params_builder_1.URLParamsBuilder.build({
            'appKey': this.config.login.appKey,
            'devMode': this.config.login.devMode,
            '__ticket__': this._ticket,
            '__cors-request__': true
        });
        if (lodash_1.isUndefined(options)) {
            options = { showLoading: true };
        }
        if (lodash_1.has(options, 'search')) {
            search.setAll(options.search);
        }
        return this.http.requestWithError(url, lodash_1.assign({}, options, { search: search })).then(function (result) {
            if (result && lodash_1.isString(result) && result.toString() == ticket_expired) {
                _this.events.publish(ticket_expired);
                return ticket_expired;
            }
            return result;
        }, function (reason) {
            return reason;
        });
    };
    CorsHttpProvider.decorators = [
        { type: core_1.Injectable },
    ];
    CorsHttpProvider.ctorParameters = [
        { type: HttpProvider, },
        { type: ionic_angular_1.Events, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [config_1.WHCYIT_IONIC_CONFIG,] },] },
    ];
    return CorsHttpProvider;
}());
exports.CorsHttpProvider = CorsHttpProvider;
//# sourceMappingURL=http.js.map