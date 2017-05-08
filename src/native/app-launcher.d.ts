import { IonicNativePlugin } from '@ionic-native/core';
export interface ExtraOptions {
    name?: string;
    value?: any;
    dataType?: string;
    paType?: string;
}
export interface AppLauncherOptions {
    packageName?: string;
    actionName?: string;
    uri?: string;
    dataType?: string;
    extras?: ExtraOptions[];
}
export declare class AppLauncher extends IonicNativePlugin {
    canLaunch(options: AppLauncherOptions): Promise<any>;
    launch(options: AppLauncherOptions): Promise<any>;
}
