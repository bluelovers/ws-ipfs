import { IIPFSPinApi } from 'ipfs-types/lib/ipfs/pin';
export declare function pin(ipfs: IIPFSPinApi): Promise<{
    add: {
        success: boolean | void;
        spendTime: number;
        error: Error;
    };
}>;
export default pin;
