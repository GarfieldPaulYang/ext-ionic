var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable, Inject } from '@angular/core';
import { Http, ResponseContentType, RequestMethod, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import { isUndefined, has, assign, isString } from 'lodash';
import { WHCYIT_IONIC_CONFIG } from '../../config/config';
import { Dialog } from '../dialog';
import { ResponseResult } from './response/response-result';
import { URLParamsBuilder } from './url-params-builder';
var ticket_expired = 'ticket_expired';
export var HttpProviderOptions = (function (_super) {
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
}(RequestOptions));
var defaultRequestOptions = new HttpProviderOptions({
    showLoading: true,
    method: RequestMethod.Get,
    responseType: ResponseContentType.Json
});
export var HttpProvider = (function () {
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
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    HttpProvider.prototype.request = function (url, options) {
        var _this = this;
        options = isUndefined(options) ? defaultRequestOptions : defaultRequestOptions.merge(options);
        var loading;
        if (options.showLoading) {
            loading = this.dialog.loading('正在加载...');
            loading.present();
        }
        return new Promise(function (resolve, reject) {
            _this.http.request(url, options).map(function (r) { return new ResponseResult(r.json()); }).toPromise().then(function (result) {
                if (loading)
                    loading.dismiss();
                resolve(result);
            }).catch(function (reason) {
                if (loading)
                    loading.dismiss();
                reject(reason);
            });
        });
    };
    HttpProvider.decorators = [
        { type: Injectable },
    ];
    HttpProvider.ctorParameters = [
        { type: Http, },
        { type: Dialog, },
    ];
    return HttpProvider;
}());
export var CorsHttpProvider = (function () {
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
        var search = URLParamsBuilder.build(options);
        search.set('__login__', 'true');
        return this.request(this.config.login.url, { search: search });
    };
    CorsHttpProvider.prototype.logout = function () {
        var _this = this;
        var search = URLParamsBuilder.build({ '__logout__': true });
        return this.request(this.config.login.url, { search: search }).then(function (result) {
            _this._ticket = null;
            return result;
        }).catch(function (reason) {
            return reason;
        });
    };
    CorsHttpProvider.prototype.request = function (url, options) {
        var _this = this;
        var search = URLParamsBuilder.build({
            'appKey': this.config.login.appKey,
            'devMode': this.config.login.devMode,
            '__ticket__': this._ticket,
            '__cors-request__': true
        });
        if (isUndefined(options)) {
            options = { showLoading: true };
        }
        if (has(options, 'search')) {
            search.setAll(options.search);
        }
        return this.http.requestWithError(url, assign({}, options, { search: search })).then(function (result) {
            if (result && isString(result) && result.toString() == ticket_expired) {
                _this.events.publish(ticket_expired);
                return ticket_expired;
            }
            return result;
        }).catch(function (reason) {
            return reason;
        });
    };
    CorsHttpProvider.decorators = [
        { type: Injectable },
    ];
    CorsHttpProvider.ctorParameters = [
        { type: HttpProvider, },
        { type: Events, },
        { type: undefined, decorators: [{ type: Inject, args: [WHCYIT_IONIC_CONFIG,] },] },
    ];
    return CorsHttpProvider;
}());
//# sourceMappingURL=http.js.map