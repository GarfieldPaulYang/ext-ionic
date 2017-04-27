var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Cordova, Plugin } from '@ionic-native/core';
var HotCodePush = HotCodePush_1 = (function () {
    function HotCodePush() {
    }
    HotCodePush.prototype.fetchUpdate = function (callback, options) { };
    ;
    HotCodePush.prototype.installUpdate = function () { return; };
    ;
    HotCodePush.prototype.isUpdateAvailableForInstallation = function (callback) { };
    ;
    HotCodePush.prototype.getVersionInfo = function (callback) { };
    ;
    HotCodePush.prototype.configure = function (config) { return; };
    ;
    HotCodePush.prototype.onUpdateInstalled = function (listener) {
        document.addEventListener(HotCodePush_1.event.UPDATE_INSTALLED, listener, false);
    };
    return HotCodePush;
}());
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
HotCodePush.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HotCodePush.ctorParameters = function () { return []; };
__decorate([
    Cordova({
        sync: true
    })
], HotCodePush.prototype, "fetchUpdate", null);
__decorate([
    Cordova()
], HotCodePush.prototype, "installUpdate", null);
__decorate([
    Cordova({
        sync: true
    })
], HotCodePush.prototype, "isUpdateAvailableForInstallation", null);
__decorate([
    Cordova({
        sync: true
    })
], HotCodePush.prototype, "getVersionInfo", null);
__decorate([
    Cordova()
], HotCodePush.prototype, "configure", null);
HotCodePush = HotCodePush_1 = __decorate([
    Plugin({
        pluginName: 'HotCodePush',
        plugin: 'cordova-hot-code-push-plugin',
        pluginRef: 'chcp',
        repo: 'https://github.com/nordnet/cordova-hot-code-push',
        platforms: ['Android', 'iOS']
    })
], HotCodePush);
export { HotCodePush };
var HotCodePush_1;
//# sourceMappingURL=hot-code-push.js.map