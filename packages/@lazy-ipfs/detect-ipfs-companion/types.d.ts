import { IIPFSPromiseApi } from 'ipfs-types';
declare global {
    interface Window {
        ipfsCompanion?: {
            ipfs?: IIPFSPromiseApi;
        };
        ipfs?: IIPFSPromiseApi;
    }
}
export declare type IWindow = Window & typeof globalThis;
export declare type IDetectIpfsCompanionSyncParams = {
    window?: IWindow;
};
export declare type IDetectIpfsWindowParams = {
    window?: {
        ipfs?: IIPFSPromiseApi;
    };
};
