import { ICIDObject } from '@lazy-ipfs/detect-cid-lib/lib/types';
export declare type IBaseNameOrBaseCodec = Parameters<ICIDObject["toString"]>[0];
export declare type IBaseName = Extract<IBaseNameOrBaseCodec, string>;
export declare type IBaseCodec = Exclude<IBaseNameOrBaseCodec, string | undefined>;
export declare function cidToString(cid: ICIDObject, base?: IBaseNameOrBaseCodec): string;
export default cidToString;
