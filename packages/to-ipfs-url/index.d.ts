import { IToCIDInputValue } from '@lazy-ipfs/to-cid';
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
export declare function isPath(cid: IToCIDInputValue): cid is string;
export declare function isCidOrPath(cid: IToCIDInputValue): boolean;
export declare function pathToCidSource(cid: IToCIDInputValue): import("@lazy-ipfs/parse-ipfs-path/lib/types").IParsePathResultStrict<string, string, import("@lazy-ipfs/parse-ipfs-path/lib/asserts").EnumParsePathResultNs>;
/**
 * @deprecated
 */
export declare function pathToCid(cid: IToCIDInputValue): string;
export declare function toURL(cid: IToCIDInputValue, options?: IOptionsInput): URL;
export declare function toPath(cid: ICIDValue, options?: IOptionsInput): string;
export declare function toLink(cid: ICIDValue, options?: IOptionsInput): string;
export default toURL;
