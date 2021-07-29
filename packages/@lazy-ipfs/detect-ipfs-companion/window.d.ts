import { IDetectIpfsWindowParams } from './types';
import { IPFS } from 'ipfs-core-types';
export declare function detectIpfsWindowSync(opts?: IDetectIpfsWindowParams): {
    ipfs: IPFS<{}>;
    provider: "window.ipfs";
};
export declare function detectIpfsWindow(opts?: IDetectIpfsWindowParams): Promise<{
    ipfs: IPFS<{}>;
    provider: "window.ipfs";
}>;
export default detectIpfsWindow;
