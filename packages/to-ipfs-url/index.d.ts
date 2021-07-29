import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
export declare enum EnumIPFSLinkType {
    ipfs = "ipfs",
    ipld = "ipld",
    ipns = "ipns",
    Gateway = "ipfs",
    IPFS = "ipfs",
    IPLD = "ipld",
    IPNS = "ipns"
}
export interface IOptions {
    type?: EnumIPFSLinkType | string;
    filename?: string;
    ignoreCheck?: boolean;
    prefix?: {
        /**
         * `https://ipfs.io/ipfs/`
         */
        ipfs?: string;
        /**
         * `https://explore.ipld.io/#/explore/`
         */
        ipld?: string;
        /**
         * `https://ipfs.io/ipns/`
         */
        ipns?: string;
    };
}
export declare type IOptionsInput = IOptions | string;
export declare function isPath(cid: ICIDValue): cid is string;
export declare function isCidOrPath(cid: ICIDValue): boolean;
export declare function pathToCid(cid: ICIDValue): string;
export declare function toURL(cid: ICIDValue, options?: IOptionsInput): URL;
export declare function toPath(cid: ICIDValue, options?: IOptionsInput): string;
export declare function toLink(cid: ICIDValue, options?: IOptionsInput): string;
export default toURL;
