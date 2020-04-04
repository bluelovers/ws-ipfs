import { IIPFSPromiseApi } from 'ipfs-types';

declare global
{
	interface Window
	{
		ipfsCompanion?: {
			ipfs?: IIPFSPromiseApi,
		}
		ipfs?: IIPFSPromiseApi,
	}
}
export type IWindow = Window & typeof globalThis;

export type IDetectIpfsCompanionSyncParams = {
	window?: IWindow
};

export type IDetectIpfsWindowParams = {
	window?: {
		ipfs?: IIPFSPromiseApi,
	}
};
