import { IOptions } from './types';
export declare function getPort2(options: {
    port: number;
}): Promise<number>;
export declare function startIPFS(options?: IOptions): Promise<any>;
export default startIPFS;
