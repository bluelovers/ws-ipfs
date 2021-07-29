// @ts-ignore
import BufferListStream, { BufferList } from 'bl';

export function toBuffer<T extends Uint8Array = Buffer>(bl: BufferListStream | BufferList): T
{
	return bl.slice()
}

export default toBuffer
