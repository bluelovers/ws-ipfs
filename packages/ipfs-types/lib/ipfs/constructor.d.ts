import { IIPFSOptions } from '../options';
import { IIPFSInstance } from './index';
export interface IIPFSConstructor {
    new (options?: IIPFSOptions): IIPFSInstance;
}
