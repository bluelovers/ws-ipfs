import { IIPFSPromiseApi } from 'ipfs-types';
import { IDetectIpfsCompanionSyncParams } from './types';
/**
 * @see https://github.com/ipfs-shipyard/ipfs-redux-bundle/blob/master/src/companion/index.js
 */
export declare function detectIpfsCompanionSync(opts?: IDetectIpfsCompanionSyncParams): {
    ipfs: IIPFSPromiseApi;
    provider: "ipfs-companion";
};
export declare function detectIpfsCompanion(opts?: IDetectIpfsCompanionSyncParams): Promise<{
    ipfs: IIPFSPromiseApi;
    provider: "ipfs-companion";
}>;
export default detectIpfsCompanion;
