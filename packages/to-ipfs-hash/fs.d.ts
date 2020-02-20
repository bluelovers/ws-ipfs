/**
 * Created by user on 2020/2/21.
 */
/// <reference types="node" />
import { IOptions } from './index';
export declare function fromFile(file: string | Buffer | number, options?: IOptions): Promise<string>;
export default fromFile;
