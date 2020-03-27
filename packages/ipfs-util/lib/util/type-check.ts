export function isBytes(obj): obj is ArrayBuffer | ArrayBufferView | Buffer
{
	return Buffer.isBuffer(obj) || ArrayBuffer.isView(obj) || obj instanceof ArrayBuffer
}

export function isBloby(obj): obj is Blob
{
	return typeof Blob !== 'undefined' && obj instanceof Blob
}

/**
 * An object with a path or content property
 */
export function isFileObject(obj)
{
	return typeof obj === 'object' && (obj.path || obj.content)
}
