import { IOptions } from './index';
import { HTTPOptions } from 'ipfs-utils/dist/src/types';
export declare function urlSource(url: string, options?: IOptions & HTTPOptions): {
    path: string;
    content?: AsyncIterable<Uint8Array>;
};
export declare function fromUrl(url: string, options?: IOptions & HTTPOptions): Promise<string>;
export default fromUrl;
