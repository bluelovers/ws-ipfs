/**
 * Created by user on 2020/8/5.
 */
import { IIPFSAddressesLike } from '../index';
export interface ILocalServerParams {
    host?: string;
    port?: number | string;
    apiPort?: number | string;
    protocol?: 'http' | 'https' | string;
}
export declare function localServerInfo(options?: ILocalServerParams): IIPFSAddressesLike;
export declare function getLocalServerValue<K extends keyof IIPFSAddressesLike>(key: K, options?: ILocalServerParams): IIPFSAddressesLike[K];
