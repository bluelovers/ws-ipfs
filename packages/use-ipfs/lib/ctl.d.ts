import { IOptions } from './types';
export declare function getPort2(options: {
    port: number;
}): Promise<number>;
export declare function startIPFS(options?: IOptions): Promise<import("ipfsd-ctl/dist/src/types").Controller>;
export default startIPFS;
