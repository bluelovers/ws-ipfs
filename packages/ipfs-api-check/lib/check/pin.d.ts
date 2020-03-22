import { IIPFSPinApi } from 'ipfs-types/lib/ipfs/pin';
export declare function pin(ipfs: IIPFSPinApi): Promise<{
    add: import("../util").IRunCheck<Error>;
}>;
export default pin;
