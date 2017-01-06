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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var util_1 = require('ionic-angular/util/util');
var dialog_1 = require('../dialog');
var response_result_1 = require('./response/response-result');
var defaultRequestOptions = new http_1.RequestOptions({
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
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    HttpProvider.prototype.request = function (url, options) {
        var _this = this;
        var loading = this.dialog.loading('正在加载...');
        loading.present();
        options = util_1.isUndefined(options) ? defaultRequestOptions : defaultRequestOptions.merge(options);
        return new Promise(function (resolve, reject) {
            _this.http.request(url, options).map(function (r) { return new response_result_1.ResponseResult(r.json()); }).toPromise().then(function (result) {
                loading.dismiss();
                resolve(result);
            }).catch(function (reason) {
                loading.dismiss();
                reject(reason);
            });
        });
    };
    HttpProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, dialog_1.Dialog])
    ], HttpProvider);
    return HttpProvider;
}());
exports.HttpProvider = HttpProvider;
//# sourceMappingURL=http.js.map