import { IIPFSOptions } from '../options';
import { IIPFSInstance } from './index';

export interface IIPFSConstructor<T = IIPFSInstance>
{
	new(options?: IIPFSOptions): T;
}
