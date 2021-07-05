'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBlob = exports.browserStreamToIt = exports.blobToAsyncGenerator = exports.toAsyncIterable = exports.toFileObject = exports.normaliseInput = void 0;
const tslib_1 = require("tslib");
const globalthis_1 = (0, tslib_1.__importDefault)(require("ipfs-utils/src//globalthis"));
//import { Buffer } from 'buffer';
const err_code_1 = (0, tslib_1.__importDefault)(require("err-code"));
const type_check_1 = require("../util/type-check");
const type_convert_1 = require("../util/type-convert");
/*
 * Transform one of:
 *
 * ```
 * Bytes (Buffer|ArrayBuffer|TypedArray) [single file]
 * Bloby (Blob|File) [single file]
 * String [single file]
 * { path, content: Bytes } [single file]
 * { path, content: Bloby } [single file]
 * { path, content: String } [single file]
 * { path, content: Iterable<Number> } [single file]
 * { path, content: Iterable<Bytes> } [single file]
 * { path, content: AsyncIterable<Bytes> } [single file]
 * Iterable<Number> [single file]
 * Iterable<Bytes> [single file]
 * Iterable<Bloby> [multiple files]
 * Iterable<String> [multiple files]
 * Iterable<{ path, content: Bytes }> [multiple files]
 * Iterable<{ path, content: Bloby }> [multiple files]
 * Iterable<{ path, content: String }> [multiple files]
 * Iterable<{ path, content: Iterable<Number> }> [multiple files]
 * Iterable<{ path, content: Iterable<Bytes> }> [multiple files]
 * Iterable<{ path, content: AsyncIterable<Bytes> }> [multiple files]
 * AsyncIterable<Bytes> [single file]
 * AsyncIterable<Bloby> [multiple files]
 * AsyncIterable<String> [multiple files]
 * AsyncIterable<{ path, content: Bytes }> [multiple files]
 * AsyncIterable<{ path, content: Bloby }> [multiple files]
 * AsyncIterable<{ path, content: String }> [multiple files]
 * AsyncIterable<{ path, content: Iterable<Number> }> [multiple files]
 * AsyncIterable<{ path, content: Iterable<Bytes> }> [multiple files]
 * AsyncIterable<{ path, content: AsyncIterable<Bytes> }> [multiple files]
 * ```
 * Into:
 *
 * ```
 * AsyncIterable<{ path, content: AsyncIterable<Buffer> }>
 * ```
 *
 * @param input Object
 * @return AsyncInterable<{ path, content: AsyncIterable<Buffer> }>
 */
function normaliseInput(input) {
    // must give us something
    if (input === null || input === undefined) {
        throw (0, err_code_1.default)(new Error(`Unexpected input: ${input}`), 'ERR_UNEXPECTED_INPUT');
    }
    // String
    if (typeof input === 'string' || input instanceof String) {
        return (async function* () {
            yield toFileObject(input);
        })();
    }
    // Buffer|ArrayBuffer|TypedArray
    // Blob|File
    if ((0, type_check_1.isBytes)(input) || (0, type_check_1.isBloby)(input)) {
        return (async function* () {
            yield toFileObject(input);
        })();
    }
    // Iterable<?>
    if (input[Symbol.iterator]) {
        return (async function* () {
            const iterator = input[Symbol.iterator]();
            const first = iterator.next();
            if (first.done)
                return iterator;
            // Iterable<Number>
            // Iterable<Bytes>
            if (Number.isInteger(first.value) || (0, type_check_1.isBytes)(first.value)) {
                yield toFileObject((function* () {
                    yield first.value;
                    yield* iterator;
                })());
                return;
            }
            // Iterable<Bloby>
            // Iterable<String>
            // Iterable<{ path, content }>
            if ((0, type_check_1.isFileObject)(first.value) || (0, type_check_1.isBloby)(first.value) || typeof first.value === 'string') {
                yield toFileObject(first.value);
                for (const obj of iterator) {
                    yield toFileObject(obj);
                }
                return;
            }
            throw (0, err_code_1.default)(new Error('Unexpected input: ' + typeof input), 'ERR_UNEXPECTED_INPUT');
        })();
    }
    // window.ReadableStream
    if (typeof input.getReader === 'function') {
        return (async function* () {
            for await (const obj of browserStreamToIt(input)) {
                yield toFileObject(obj);
            }
        })();
    }
    // AsyncIterable<?>
    if (input[Symbol.asyncIterator]) {
        return (async function* () {
            const iterator = input[Symbol.asyncIterator]();
            const first = await iterator.next();
            if (first.done)
                return iterator;
            // AsyncIterable<Bytes>
            if ((0, type_check_1.isBytes)(first.value)) {
                yield toFileObject((async function* () {
                    yield first.value;
                    yield* iterator;
                })());
                return;
            }
            // AsyncIterable<Bloby>
            // AsyncIterable<String>
            // AsyncIterable<{ path, content }>
            if ((0, type_check_1.isFileObject)(first.value) || (0, type_check_1.isBloby)(first.value) || typeof first.value === 'string') {
                yield toFileObject(first.value);
                for await (const obj of iterator) {
                    yield toFileObject(obj);
                }
                return;
            }
            throw (0, err_code_1.default)(new Error('Unexpected input: ' + typeof input), 'ERR_UNEXPECTED_INPUT');
        })();
    }
    // { path, content: ? }
    // Note: Detected _after_ AsyncIterable<?> because Node.js streams have a
    // `path` property that passes this check.
    if ((0, type_check_1.isFileObject)(input)) {
        return (async function* () {
            yield toFileObject(input);
        })();
    }
    throw (0, err_code_1.default)(new Error('Unexpected input: ' + typeof input), 'ERR_UNEXPECTED_INPUT');
}
exports.normaliseInput = normaliseInput;
function toFileObject(input) {
    const obj = {
        path: input.path || '',
        mode: input.mode,
        mtime: input.mtime,
        content: void 0,
    };
    if (input.content) {
        obj.content = toAsyncIterable(input.content);
    }
    else if (!input.path) { // Not already a file object with path or content prop
        obj.content = toAsyncIterable(input);
    }
    return obj;
}
exports.toFileObject = toFileObject;
function toAsyncIterable(input) {
    // Bytes | String
    if ((0, type_check_1.isBytes)(input) || typeof input === 'string') {
        return (async function* () {
            yield (0, type_convert_1.toBuffer)(input);
        })();
    }
    // Bloby
    if ((0, type_check_1.isBloby)(input)) {
        return blobToAsyncGenerator(input);
    }
    // Browser stream
    if (typeof input.getReader === 'function') {
        return browserStreamToIt(input);
    }
    // Iterator<?>
    if (input[Symbol.iterator]) {
        return (async function* () {
            const iterator = input[Symbol.iterator]();
            const first = iterator.next();
            if (first.done)
                return iterator;
            // Iterable<Number>
            if (Number.isInteger(first.value)) {
                yield (0, type_convert_1.toBuffer)(Array.from((function* () {
                    yield first.value;
                    yield* iterator;
                })()));
                return;
            }
            // Iterable<Bytes>
            if ((0, type_check_1.isBytes)(first.value)) {
                yield (0, type_convert_1.toBuffer)(first.value);
                for (const chunk of iterator) {
                    yield (0, type_convert_1.toBuffer)(chunk);
                }
                return;
            }
            throw (0, err_code_1.default)(new Error('Unexpected input: ' + typeof input), 'ERR_UNEXPECTED_INPUT');
        })();
    }
    // AsyncIterable<Bytes>
    if (input[Symbol.asyncIterator]) {
        return (async function* () {
            for await (const chunk of input) {
                yield (0, type_convert_1.toBuffer)(chunk);
            }
        })();
    }
    throw (0, err_code_1.default)(new Error(`Unexpected input: ${input}`), 'ERR_UNEXPECTED_INPUT');
}
exports.toAsyncIterable = toAsyncIterable;
function blobToAsyncGenerator(blob) {
    if (typeof blob.stream === 'function') {
        // firefox < 69 does not support blob.stream()
        return browserStreamToIt(blob.stream());
    }
    return readBlob(blob);
}
exports.blobToAsyncGenerator = blobToAsyncGenerator;
async function* browserStreamToIt(stream) {
    const reader = stream.getReader();
    while (true) {
        const result = await reader.read();
        if (result.done) {
            return;
        }
        yield result.value;
    }
}
exports.browserStreamToIt = browserStreamToIt;
async function* readBlob(blob, options) {
    options = options || {};
    const reader = new globalthis_1.default.FileReader();
    const chunkSize = options.chunkSize || 1024 * 1024;
    let offset = options.offset || 0;
    const getNextChunk = () => new Promise((resolve, reject) => {
        reader.onloadend = e => {
            const data = e.target.result;
            resolve(data.byteLength === 0 ? null : data);
        };
        reader.onerror = reject;
        const end = offset + chunkSize;
        const slice = blob.slice(offset, end);
        reader.readAsArrayBuffer(slice);
        offset = end;
    });
    while (true) {
        const data = await getNextChunk();
        if (data == null) {
            return;
        }
        yield Buffer.from(data);
    }
}
exports.readBlob = readBlob;
//# sourceMappingURL=toFileObject.js.map