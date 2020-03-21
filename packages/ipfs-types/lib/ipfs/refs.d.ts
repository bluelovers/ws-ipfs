import { INetworkOptionsBase } from '../options';
export interface IRefsObject {
    ref: string;
    err?: Error | null;
}
export interface IIPFSRefsApiCore {
    /**
     * Get links (references) from an object.
     */
    (ipfsPath: any, options?: {
        recursive?: boolean;
        unique?: boolean;
        format?: string;
        edges?: boolean;
        maxDepth?: number;
    } & INetworkOptionsBase): AsyncIterable<IRefsObject>;
    local(): AsyncIterable<IRefsObject>;
}
export interface IIPFSRefsApi {
    /**
     * Get links (references) from an object.
     */
    refs: IIPFSRefsApiCore;
}
