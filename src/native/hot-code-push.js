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
var ionic_native_1 = require('ionic-native');
var HotCodePush = (function () {
    function HotCodePush() {
    }
    HotCodePush.fetchUpdate = function () { return; };
    ;
    HotCodePush.installUpdate = function () { return; };
    ;
    HotCodePush.isUpdateAvailableForInstallation = function () { return; };
    ;
    HotCodePush.getVersionInfo = function () { return; };
    ;
    HotCodePush.configure = function (config) { return; };
    ;
    HotCodePush.onUpdateInstalled = function (listener) {
        document.addEventListener(HotCodePush.event.UPDATE_INSTALLED, listener, false);
    };
    HotCodePush.onAppNeedUpdate = function () {
        return new Promise(function (resolve) {
            document.addEventListener(HotCodePush.event.UPDATE_LOAD_FAILED, function (event) {
                var error = event['detail'].error;
                if (error && error.code === HotCodePush.error.APPLICATION_BUILD_VERSION_TOO_LOW) {
                    resolve();
                }
            }, false);
        });
    };
    HotCodePush.error = {
        NOTHING_TO_INSTALL: 1,
        NOTHING_TO_UPDATE: 2,
        FAILED_TO_DOWNLOAD_APPLICATION_CONFIG: -1,
        APPLICATION_BUILD_VERSION_TOO_LOW: -2,
        FAILED_TO_DOWNLOAD_CONTENT_MANIFEST: -3,
        FAILED_TO_DOWNLOAD_UPDATE_FILES: -4,
        FAILED_TO_MOVE_LOADED_FILES_TO_INSTALLATION_FOLDER: -5,
        UPDATE_IS_INVALID: -6,
        FAILED_TO_COPY_FILES_FROM_PREVIOUS_RELEASE: -7,
        FAILED_TO_COPY_NEW_CONTENT_FILES: -8,
        LOCAL_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND: -9,
        LOCAL_VERSION_OF_MANIFEST_NOT_FOUND: -10,
        LOADED_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND: -11,
        LOADED_VERSION_OF_MANIFEST_NOT_FOUND: -12,
        FAILED_TO_INSTALL_ASSETS_ON_EXTERNAL_STORAGE: -13,
        CANT_INSTALL_WHILE_DOWNLOAD_IN_PROGRESS: -14,
        CANT_DOWNLOAD_UPDATE_WHILE_INSTALLATION_IN_PROGRESS: -15,
        INSTALLATION_ALREADY_IN_PROGRESS: -16,
        DOWNLOAD_ALREADY_IN_PROGRESS: -17,
        ASSETS_FOLDER_IN_NOT_YET_INSTALLED: -18,
        NEW_APPLICATION_CONFIG_IS_INVALID: -19
    };
    HotCodePush.event = {
        BEFORE_ASSETS_INSTALLATION: 'chcp_beforeAssetsInstalledOnExternalStorage',
        ASSETS_INSTALLATION_FAILED: 'chcp_assetsInstallationError',
        ASSETS_INSTALLED: 'chcp_assetsInstalledOnExternalStorage',
        NOTHING_TO_UPDATE: 'chcp_nothingToUpdate',
        UPDATE_LOAD_FAILED: 'chcp_updateLoadFailed',
        UPDATE_IS_READY_TO_INSTALL: 'chcp_updateIsReadyToInstall',
        BEFORE_UPDATE_INSTALLATION: 'chcp_beforeInstall',
        UPDATE_INSTALLATION_FAILED: 'chcp_updateInstallFailed',
        UPDATE_INSTALLED: 'chcp_updateInstalled',
        NOTHING_TO_INSTALL: 'chcp_nothingToInstall'
    };
    __decorate([
        ionic_native_1.Cordova(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Promise)
    ], HotCodePush, "fetchUpdate", null);
    __decorate([
        ionic_native_1.Cordova(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Promise)
    ], HotCodePush, "installUpdate", null);
    __decorate([
        ionic_native_1.Cordova(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Promise)
    ], HotCodePush, "isUpdateAvailableForInstallation", null);
    __decorate([
        ionic_native_1.Cordova(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Promise)
    ], HotCodePush, "getVersionInfo", null);
    __decorate([
        ionic_native_1.Cordova(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', Promise)
    ], HotCodePush, "configure", null);
    HotCodePush = __decorate([
        ionic_native_1.Plugin({
            pluginName: 'HotCodePush',
            plugin: 'cordova-hot-code-push-plugin',
            pluginRef: 'chcp',
            repo: 'https://github.com/nordnet/cordova-hot-code-push'
        }), 
        __metadata('design:paramtypes', [])
    ], HotCodePush);
    return HotCodePush;
}());
exports.HotCodePush = HotCodePush;
//# sourceMappingURL=hot-code-push.js.map