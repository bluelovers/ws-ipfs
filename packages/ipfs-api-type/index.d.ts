import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs';
export declare function ipfsApiType(ipfs: IIPFSApiUtils): Promise<string | "js" | "go">;
export default ipfsApiType;
