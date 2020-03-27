/// <reference types="node" />
export declare function isBytes(obj: any): obj is ArrayBuffer | ArrayBufferView | Buffer;
export declare function isBloby(obj: any): obj is Blob;
/**
 * An object with a path or content property
 */
export declare function isFileObject(obj: any): any;
