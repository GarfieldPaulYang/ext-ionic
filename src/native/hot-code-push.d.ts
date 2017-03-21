export interface HotCodePushConifg {
    'config-file'?: string;
    'auto-download'?: boolean;
    'auto-install'?: boolean;
}
export interface HotCodePushOptions {
    'config-file'?: string;
    'request-headers'?: any;
}
export interface HotCodeCallback {
    (error: any, data: any): void;
}
export declare class HotCodePush {
    static error: {
        NOTHING_TO_INSTALL: number;
        NOTHING_TO_UPDATE: number;
        FAILED_TO_DOWNLOAD_APPLICATION_CONFIG: number;
        APPLICATION_BUILD_VERSION_TOO_LOW: number;
        FAILED_TO_DOWNLOAD_CONTENT_MANIFEST: number;
        FAILED_TO_DOWNLOAD_UPDATE_FILES: number;
        FAILED_TO_MOVE_LOADED_FILES_TO_INSTALLATION_FOLDER: number;
        UPDATE_IS_INVALID: number;
        FAILED_TO_COPY_FILES_FROM_PREVIOUS_RELEASE: number;
        FAILED_TO_COPY_NEW_CONTENT_FILES: number;
        LOCAL_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND: number;
        LOCAL_VERSION_OF_MANIFEST_NOT_FOUND: number;
        LOADED_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND: number;
        LOADED_VERSION_OF_MANIFEST_NOT_FOUND: number;
        FAILED_TO_INSTALL_ASSETS_ON_EXTERNAL_STORAGE: number;
        CANT_INSTALL_WHILE_DOWNLOAD_IN_PROGRESS: number;
        CANT_DOWNLOAD_UPDATE_WHILE_INSTALLATION_IN_PROGRESS: number;
        INSTALLATION_ALREADY_IN_PROGRESS: number;
        DOWNLOAD_ALREADY_IN_PROGRESS: number;
        ASSETS_FOLDER_IN_NOT_YET_INSTALLED: number;
        NEW_APPLICATION_CONFIG_IS_INVALID: number;
    };
    static event: {
        BEFORE_ASSETS_INSTALLATION: string;
        ASSETS_INSTALLATION_FAILED: string;
        ASSETS_INSTALLED: string;
        NOTHING_TO_UPDATE: string;
        UPDATE_LOAD_FAILED: string;
        UPDATE_IS_READY_TO_INSTALL: string;
        BEFORE_UPDATE_INSTALLATION: string;
        UPDATE_INSTALLATION_FAILED: string;
        UPDATE_INSTALLED: string;
        NOTHING_TO_INSTALL: string;
    };
    fetchUpdate(callback: HotCodeCallback, options?: HotCodePushOptions): void;
    installUpdate(): Promise<any>;
    isUpdateAvailableForInstallation(callback: HotCodeCallback): void;
    getVersionInfo(callback: HotCodeCallback): void;
    configure(config: HotCodePushConifg): Promise<any>;
    onUpdateInstalled(listener: EventListenerOrEventListenerObject): void;
}
