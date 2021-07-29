import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs';
export declare function fixIPFSAddressesSwarmWss(argv: {
    error: Error & {
        code?: string;
    };
    ipfs: IIPFSPromiseApi;
}): Promise<void | IIPFSPromiseApi<{}>>;
