import CID from 'cids';
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
export declare function isPath(cid: string | CID): cid is string;
export declare function isCidOrPath(cid: string | CID): boolean;
export declare function pathToCid(cid: string | CID): string;
export declare function toURL(cid: string | CID, options?: IOptionsInput): URL;
export declare function toPath(cid: string | CID, options?: IOptionsInput): string;
export declare function toLink(cid: string | CID, options?: IOptionsInput): string;
export default toURL;
