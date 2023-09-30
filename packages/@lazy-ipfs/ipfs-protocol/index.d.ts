export interface IOptions {
    pathname?: string;
    path?: string;
}
export type IOptionsCore = IOptions & {
    ns: 'ipfs' | 'ipns';
} & ({
    cid: string;
    hash?: undefined;
} | {
    cid?: undefined;
    hash: string;
});
export declare function _ipfsProtocolURL(options: IOptionsCore): URL;
export declare function ipnsProtocolURL(cid: string, pathname?: string | IOptions): URL;
export declare function ipfsProtocolURL(cid: string, pathname?: string | IOptions): URL;
export declare function ipfsProtocol(cid: string, pathname?: string | IOptions): string;
export declare function ipnsProtocol(cid: string, pathname?: string | IOptions): string;
export default ipfsProtocol;
