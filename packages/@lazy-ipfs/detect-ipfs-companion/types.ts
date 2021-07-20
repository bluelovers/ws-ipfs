import { IPFS } from 'ipfs-core-types';

declare global
{
	interface Window
	{
		ipfsCompanion?: {
			ipfs?: IPFS,
		}
		ipfs?: IPFS,
		chrome: Window["chrome"] & {

		}
	}
}
export type IWindow = Window & typeof globalThis;

export type IDetectIpfsCompanionSyncParams = {
	window?: IWindow
};

export type IDetectIpfsWindowParams = {
	window?: {
		ipfs?: IPFS,
	}
};
