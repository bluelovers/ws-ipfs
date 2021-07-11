import { IIPFSFileApi } from './file';
import { IApiOptions } from '../options';
import { IId, IVersion } from '../types';
import { IPFS } from 'ipfs-core-types';
export interface IIPFSApiReturnType {
    version: IVersion;
    id: IId;
    ping: {
        success: boolean;
        time: number;
        text: string;
    };
}
export interface IIPFSAsyncIterableApi extends IIPFSFileApi {
    /**
     * @example
     * for await (const res of ipfs.ping('Qmhash')) {
     * if (res.time) {
     * console.log(`Pong received: time=${res.time} ms`)
     * } else {
     * console.log(res.text)
     * }
}
     */
    ping(peerId: string, options?: IApiOptions<{
        count?: number;
    }>): AsyncIterable<IIPFSApiReturnType['ping']>;
}
export interface IIPFSApiUtils {
    version(options?: any): Promise<IIPFSApiReturnType['version']>;
    id(options?: any): Promise<IIPFSApiReturnType['id']>;
}
export interface IIPFSApiCtrl {
    start(): any;
    stop(): any;
}
export { IPFS as IIPFSPromiseApi };
