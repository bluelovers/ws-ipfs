import { IIPFSPromiseApi } from 'ipfs-types';
import { IIPFSClientAddresses } from '@bluelovers/ipfs-http-client';
import { IIPFSFileApi, IFileData, IIPFSFileApiAddOptions } from 'ipfs-types/lib/ipfs/file';
import { ITSValueOrArray } from 'ts-type';
import { INetworkOptionsBase } from 'ipfs-types/lib/options';
import { IPublishToIPFSReturn } from './types';
import Bluebird from 'bluebird';
export declare function publishToIPFSAll(data: IFileData, useIPFS: ITSValueOrArray<string | IIPFSPromiseApi | IIPFSClientAddresses | Pick<IIPFSFileApi, 'add'>>, options?: {
    addOptions?: IIPFSFileApiAddOptions;
} & INetworkOptionsBase): Bluebird<IPublishToIPFSReturn>;
export default publishToIPFSAll;
