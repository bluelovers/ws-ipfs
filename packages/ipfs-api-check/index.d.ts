import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';
export declare function checkAll(ipfs: IIPFSPromiseApi): Promise<Record<"object" | "add" | "get" | "version" | "id" | "cat" | "ls" | "pin", any>>;
export default checkAll;
