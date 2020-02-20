export declare enum EnumIPFSType {
    Unknown = 0,
    Client = 1,
    Controller = 2
}
/**
 * check ipfs is work
 */
export declare function checkIPFS(ipfs: any): Promise<boolean>;
/**
 * get IPFS, if not exists, create or connect it
 */
export declare function useIPFS(options?: object): Promise<Readonly<{
    ipfs: any;
    ipfsType: EnumIPFSType;
    stop(...argv: any[]): Promise<void>;
}>>;
/**
 * create or connect it
 */
export declare function getIPFS(options?: object): Promise<Readonly<{
    ipfs: any;
    ipfsType: EnumIPFSType;
    stop(...argv: any[]): Promise<void>;
}>>;
export default useIPFS;
