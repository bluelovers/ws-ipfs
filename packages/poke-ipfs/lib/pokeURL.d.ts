import { IPokeReturnBase, IPokeOptions } from './types';
export declare function pokeURL(ipfsURL: URL | string, options?: IPokeOptions): Promise<(Pick<IPokeReturnBase, "error" | "headers" | "status" | "statusText"> & {
    value: string;
}) | (Pick<IPokeReturnBase, "error" | "headers" | "status" | "statusText"> & {
    value: false;
}) | (Pick<IPokeReturnBase, "headers" | "value" | "status" | "statusText"> & {
    error: Error;
})>;
export default pokeURL;
