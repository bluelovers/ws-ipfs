/// <reference types="node" />
export declare function parse<T>(dataBuffer: Buffer): T;
export declare function stringify<T>(dataValue: T): Buffer;
declare const _default: {
    parse: typeof parse;
    stringify: typeof stringify;
};
export default _default;
