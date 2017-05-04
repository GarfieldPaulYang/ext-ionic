var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import { Http, ResponseContentType, RequestMethod, RequestOptions, Headers } from '@angular/http';
import { Events } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import * as _ from 'lodash';
import { ConfigProvider } from '../../config/config';
import { Dialog } from '../../utils/dialog';
import { isPresent } from '../../utils/util';
import { ResponseResult } from '../../utils/http/response/response-result';
import { URLParamsBuilder } from '../../utils/http/url-params-builder';
import { StringUtils } from '../../utils/string';
import { JsonFileStorage } from '../storage/json-file-storage';
import { MemoryStorage } from '../storage/mem-storage';
export var ticket_expired = 'ticket-expired';
var HttpProviderOptions = (function (_super) {
    __extends(HttpProviderOptions, _super);
    function HttpProviderOptions(options) {
        var _this = _super.call(this, options) || this;
        _this.showLoading = options.showLoading;
        _this.loadingContent = options.loadingContent;
        _this.showErrorAlert = options.showErrorAlert;
        _this.cache = options.cache;
        _this.cacheOnly = options.cacheOnly;
        _this.memCache = options.memCache;
        _this.maxCacheAge = options.maxCacheAge;
        return _this;
    }
    HttpProviderOptions.prototype.merge = function (options) {
        var result = _super.prototype.merge.call(this, options);
        result.showLoading = isPresent(options.showLoading) ? options.showLoading : this.showLoading;
        result.showErrorAlert = isPresent(options.showErrorAlert) ? options.showErrorAlert : this.showErrorAlert;
        result.loadingContent = options.loadingContent ? options.loadingContent : this.loadingContent;
        result.cache = isPresent(options.cache) ? options.cache : this.cache;
        result.cacheOnly = isPresent(options.cacheOnly) ? options.cacheOnly : this.cacheOnly;
        result.memCache = isPresent(options.memCache) ? options.memCache : this.memCache;
        result.maxCacheAge = isPresent(options.maxCacheAge) ? options.maxCacheAge : this.maxCacheAge;
        return result;
    };
    return HttpProviderOptions;
}(RequestOptions));
export { HttpProviderOptions };
var HTTP_CACHE_DIR = 'whc';
var defaultRequestOptions = new HttpProviderOptions({
    showLoading: true,
    loadingContent: '正在加载...',
    showErrorAlert: true,
    cache: false,
    cacheOnly: false,
    memCache: false,
    maxCacheAge: 1000 * 60 * 60 * 6,
    method: RequestMethod.Get,
    responseType: ResponseContentType.Json
});
var APP_JSON_TYPE = 'application/json';
var HttpProvider = (function () {
    function HttpProvider(_http, jsonCache, memCache, config, dialog) {
        this._http = _http;
        this.jsonCache = jsonCache;
        this.memCache = memCache;
        this.config = config;
        this.dialog = dialog;
    }
    Object.defineProperty(HttpProvider.prototype, "http", {
        get: function () {
            return this._http;
        },
        enumerable: true,
        configurable: true
    });
    HttpProvider.prototype.requestWithError = function (url, options, foundCacheCallback) {
        var _this = this;
        if (foundCacheCallback === void 0) { foundCacheCallback = function (result) { }; }
        options = options ? defaultRequestOptions.merge(options) : defaultRequestOptions;
        var cache = options.memCache ? this.memCache : this.jsonCache;
        var innerRequest = function (url, options) {
            return _this.request(url, options).then(function (result) {
                if (result.status === 1) {
                    if (options.showErrorAlert) {
                        _this.dialog.alert('系统提示', result.msg);
                    }
                    if (isPresent(result.data) && !_.isEqual({}, result.data)) {
                        return Promise.reject(result);
                    }
                    return Promise.reject(result.msg);
                }
                if (options.cache && options.method === RequestMethod.Get && cacheKey) {
                    cache.save({ dirname: HTTP_CACHE_DIR, filename: cacheKey, content: result.data });
                }
                return result.data;
            }).catch(function (err) {
                return Promise.reject(err);
            });
        };
        var cacheKey;
        if (options.cache && options.method === RequestMethod.Get) {
            cacheKey = this.hashUrl(url, (options.params || options.search));
            if (options.cacheOnly) {
                return cache.load({ dirname: HTTP_CACHE_DIR, filename: cacheKey, maxAge: options.maxCacheAge }).catch(function () { return innerRequest(url, options); });
            }
            cache.load({ dirname: HTTP_CACHE_DIR, filename: cacheKey }).then(function (result) {
                foundCacheCallback(result);
            }).catch(function (error) { return console.log(error); });
        }
        return innerRequest(url, options);
    };
    HttpProvider.prototype.request = function (url, options) {
        options = options || defaultRequestOptions;
        var loading;
        if (options.showLoading) {
            loading = this.dialog.loading(options.loadingContent);
            loading.present();
        }
        return this.ajax(url, options).toPromise().then(function (result) {
            if (loading)
                loading.dismiss();
            return result;
        }).catch(function (err) {
            if (loading)
                loading.dismiss();
            return Promise.reject(err);
        });
    };
    HttpProvider.prototype.ajax = function (url, options) {
        options = options || defaultRequestOptions;
        var params = URLParamsBuilder.build({ '__cors-request__': true });
        if (options.search) {
            params.replaceAll(options.search);
        }
        if (options.params) {
            params.replaceAll(options.params);
        }
        options.params = params;
        if (options.method === RequestMethod.Post) {
            options.body = options.body || {};
            options.headers = options.headers || new Headers();
            var contentType = options.headers.get('Content-Type');
            if (!contentType) {
                contentType = APP_JSON_TYPE;
                options.headers.set('Content-Type', contentType);
            }
            if (!_.isString(options.body) && !(options.body instanceof FormData)) {
                if (APP_JSON_TYPE === contentType.toLowerCase()) {
                    options.body = JSON.stringify(options.body);
                }
                else {
                    options.body = URLParamsBuilder.build(options.body).toString();
                }
            }
        }
        return this.http.request(url, options).map(function (r) { return new ResponseResult(r.json()); });
    };
    HttpProvider.prototype.hashUrl = function (url, params) {
        var q = params ? params.toString() : '';
        return StringUtils.hash(url + q).toString();
    };
    return HttpProvider;
}());
export { HttpProvider };
HttpProvider.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HttpProvider.ctorParameters = function () { return [
    { type: Http, },
    { type: JsonFileStorage, },
    { type: MemoryStorage, },
    { type: ConfigProvider, },
    { type: Dialog, },
]; };
var CorsHttpProvider = (function () {
    function CorsHttpProvider(http, events, config, device) {
        this.http = http;
        this.events = events;
        this.config = config;
        this.device = device;
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
    Object.defineProperty(CorsHttpProvider.prototype, "httpProvider", {
        get: function () {
            return this.http;
        },
        enumerable: true,
        configurable: true
    });
    CorsHttpProvider.prototype.login = function (options) {
        return this.request(this.config.get().login.url, {
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                '__login__': 'true',
                '__uuid__': this.device.uuid,
                '__model__': this.device.model
            }),
            method: RequestMethod.Post,
            showErrorAlert: false,
            body: options
        });
    };
    CorsHttpProvider.prototype.logout = function () {
        var _this = this;
        return this.request(this.config.get().login.url, {
            cache: false,
            headers: new Headers({
                '__logout__': 'true'
            })
        }).then(function (result) {
            _this.ticket = null;
            return result;
        });
    };
    CorsHttpProvider.prototype.request = function (url, options, foundCacheCallback) {
        var _this = this;
        if (foundCacheCallback === void 0) { foundCacheCallback = function (result) { }; }
        options = options || {};
        options.headers = options.headers || new Headers();
        options.headers.set('__app-key__', this.config.get().login.appKey);
        options.headers.set('__dev-mode__', this.config.get().devMode + '');
        options.headers.set('__ticket__', this.ticket);
        return this.http.requestWithError(url, options, foundCacheCallback).then(function (result) {
            return result;
        }).catch(function (err) {
            if (err && _.isString(err) && err.toString() === ticket_expired) {
                _this.events.publish(ticket_expired);
            }
            return Promise.reject(err);
        });
    };
    return CorsHttpProvider;
}());
export { CorsHttpProvider };
CorsHttpProvider.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CorsHttpProvider.ctorParameters = function () { return [
    { type: HttpProvider, },
    { type: Events, },
    { type: ConfigProvider, },
    { type: Device, },
]; };
//# sourceMappingURL=http.js.map