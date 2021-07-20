import { IPFS } from 'ipfs-core-types';
declare global {
    interface Window {
        ipfsCompanion?: {
            ipfs?: IPFS;
        };
        ipfs?: IPFS;
        chrome: Window["chrome"] & {};
    }
}
export declare type IWindow = Window & typeof globalThis;
export declare type IDetectIpfsCompanionSyncParams = {
    window?: IWindow;
};
export declare type IDetectIpfsWindowParams = {
    window?: {
        ipfs?: IPFS;
    };
};
