import { IIPFSOptions } from '../options';
import { IIPFSInstance } from './types';

export interface IIPFSConstructor<T = IIPFSInstance>
{
	new(options?: IIPFSOptions): T;
}
