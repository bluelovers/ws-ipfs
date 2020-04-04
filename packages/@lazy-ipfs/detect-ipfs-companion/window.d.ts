import { IDetectIpfsWindowParams } from './types';
import { IIPFSPromiseApi } from 'ipfs-types';
export declare function detectIpfsWindowSync(opts?: IDetectIpfsWindowParams): {
    ipfs: IIPFSPromiseApi;
    provider: "window.ipfs";
};
export declare function detectIpfsWindow(opts?: IDetectIpfsWindowParams): Promise<{
    ipfs: IIPFSPromiseApi;
    provider: "window.ipfs";
}>;
export default detectIpfsWindow;
