import { IDetectIpfsCompanionSyncParams } from './types';
import { IPFS } from 'ipfs-core-types';
/**
 * @see https://github.com/ipfs-shipyard/ipfs-redux-bundle/blob/master/src/companion/index.js
 */
export declare function detectIpfsCompanionSync(opts?: IDetectIpfsCompanionSyncParams): {
    ipfs: IPFS<{}>;
    provider: "ipfs-companion";
};
export declare function detectIpfsCompanion(opts?: IDetectIpfsCompanionSyncParams): Promise<{
    ipfs: IPFS<{}>;
    provider: "ipfs-companion";
}>;
export default detectIpfsCompanion;
