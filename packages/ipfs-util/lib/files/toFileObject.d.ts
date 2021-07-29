/// <reference types="node" />
export declare function normaliseInput(input: any): AsyncGenerator<{
    path: any;
    mode: any;
    mtime: any;
    content: any;
}, any, unknown>;
export declare function toFileObject(input: any): {
    path: any;
    mode: any;
    mtime: any;
    content: any;
};
export declare function toAsyncIterable(input: any): AsyncGenerator<any, void, unknown> | AsyncGenerator<ArrayBufferView | ArrayBuffer | Buffer, any, unknown>;
export declare function blobToAsyncGenerator(blob: any): AsyncGenerator<any, void, unknown>;
export declare function browserStreamToIt(stream: any): AsyncGenerator<any, void, unknown>;
export declare function readBlob(blob: any, options?: any): AsyncGenerator<Buffer, void, unknown>;
