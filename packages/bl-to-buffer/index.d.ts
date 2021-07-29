/// <reference types="node" />
import BufferListStream, { BufferList } from 'bl';
export declare function toBuffer<T extends Uint8Array = Buffer>(bl: BufferListStream | BufferList): T;
export default toBuffer;
