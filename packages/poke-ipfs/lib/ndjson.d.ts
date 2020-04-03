import { IAsyncIteratorAble } from './types';
/**
 * Parses NDJSON chunks from an iterator
 */
export declare function ndjson<T = any>(source: IAsyncIteratorAble<Uint8Array>): AsyncGenerator<T, void>;
export default ndjson;
