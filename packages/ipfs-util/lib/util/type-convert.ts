import { isBytes } from './type-check';

export function toBuffer(chunk): ArrayBuffer | ArrayBufferView | Buffer
{
	return isBytes(chunk) ? chunk : Buffer.from(chunk)
}
