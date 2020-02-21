// @ts-ignore
import BufferListStream, { BufferList } from 'bl';

export function toBuffer(bl: BufferListStream | BufferList): Buffer
{
	return bl.slice()
}

export default toBuffer
