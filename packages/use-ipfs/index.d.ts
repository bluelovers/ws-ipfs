import { EnumIPFSType, IOptions, IOptionsExtra } from './lib/types';
import { IIPFSAddresses } from 'ipfs-types';
interface ICachedObject extends Readonly<{
    ipfs: any;
    ipfsType: EnumIPFSType;
    stop(...argv: any[]): Promise<void>;
    address(): Promise<Readonly<IIPFSAddresses>>;
}> {
}
/**
 * get IPFS, if not exists, create or connect it
 */
export declare function useIPFS(options?: IOptions, optionsExtra?: IOptionsExtra): Promise<ICachedObject>;
/**
 * create or connect it
 */
export declare function getIPFS(options?: IOptions, optionsExtra?: IOptionsExtra): Promise<ICachedObject>;
export default useIPFS;
