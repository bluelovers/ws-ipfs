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
}
export declare type IOptionsInput = IOptions | string;
export declare function toURL(cid: string, options?: IOptionsInput): URL;
export declare function toLink(cid: string, options?: IOptionsInput): string;
export default toURL;
