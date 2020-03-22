import { IIPFSClientReturn } from '@bluelovers/ipfs-http-client';
import { EnumIPFSType, IOptions, IOptionsExtra } from './lib/types';
import { IIPFSAddresses } from 'ipfs-types';
export declare type ICachedObject<IPFS = IIPFSClientReturn> = Readonly<{
    ipfs: IPFS;
    ipfsType: EnumIPFSType;
    stop(...argv: any[]): Promise<void>;
    address(): Promise<Readonly<IIPFSAddresses>>;
    /**
     * ipfsd-ctl
     */
    ipfsd: any;
}>;
/**
 * get IPFS, if not exists, create or connect it
 */
export declare function useIPFS<IPFS = IIPFSClientReturn>(options?: IOptions, optionsExtra?: IOptionsExtra): Promise<Readonly<{
    ipfs: IPFS;
    ipfsType: EnumIPFSType;
    stop(...argv: any[]): Promise<void>;
    address(): Promise<Readonly<IIPFSAddresses>>;
    /**
     * ipfsd-ctl
     */
    ipfsd: any;
}>>;
/**
 * create or connect it
 */
export declare function getIPFS<IPFS = IIPFSClientReturn>(options?: IOptions, optionsExtra?: IOptionsExtra): Promise<Readonly<{
    ipfs: IPFS;
    ipfsType: EnumIPFSType;
    stop(...argv: any[]): Promise<void>;
    address(): Promise<Readonly<IIPFSAddresses>>;
    /**
     * ipfsd-ctl
     */
    ipfsd: any;
}>>;
export default useIPFS;
