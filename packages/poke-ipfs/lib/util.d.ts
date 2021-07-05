/**
 * Created by user on 2020/4/3.
 */
export declare function isLocalHost(url: URL | string): boolean;
export declare function isLocalNetwork(url: URL | string): boolean;
export declare function notAllowCors(url: URL | string): boolean;
export declare function corsURL(url: URL | string, cors?: boolean): URL;
