export declare class ImageLoaderConfig {
    spinnerEnabled: boolean;
    backgroundSize: string;
    backgroundRepeat: string;
    display: string;
    width: string;
    height: string;
    useImg: boolean;
    fallbackUrl: string;
    private _cacheDirectoryName;
    cacheDirectoryName: string;
    enableSpinner(enable: boolean): void;
    setCacheDirectoryName(name: string): void;
    setHeight(height: string): void;
    setWidth(width: string): void;
    setDisplay(display: string): void;
    useImageTag(use: boolean): void;
    setBackgroundSize(backgroundSize: string): void;
    setBackgroundRepeat(backgroundRepeat: string): void;
    setFallbackUrl(fallbackUrl: string): void;
}
