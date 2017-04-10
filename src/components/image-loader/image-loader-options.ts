export interface ImageLoaderOptions {
  spinnerEnabled?: boolean;
  backgroundSize?: string;
  backgroundRepeat?: string;
  display?: string;
  width?: string;
  height?: string;
  useImg?: boolean;
  fallbackUrl?: string;
  cacheDirectoryName?: string;
  concurrency?: number;
  maxCacheSize?: number;
  maxCacheAge?: number;
}