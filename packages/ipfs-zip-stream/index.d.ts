/**
 * Created by user on 2020/3/27.
 */
/// <reference types="node" />
import JSZip, { JSZipLoadOptions } from 'jszip';
import { ITSResolvable } from 'ts-type';
export interface IOptions {
    jsZipLoadOptions?: JSZipLoadOptions;
    prefixPath?: string;
}
export declare function fromBuffer(buf: ITSResolvable<Buffer>, options?: IOptions): AsyncGenerator<{
    path: string;
    content: number[];
    mode: any;
    mtime: Date;
}, void, unknown>;
export declare function fromString(base64: ITSResolvable<string>, options?: IOptions): AsyncGenerator<{
    path: string;
    content: number[];
    mode: any;
    mtime: Date;
}, void, unknown>;
export declare function fromJSZip(zip: ITSResolvable<JSZip>, options?: IOptions): AsyncGenerator<{
    path: string;
    content: number[];
    mode: any;
    mtime: Date;
}, void, unknown>;
export default fromBuffer;
