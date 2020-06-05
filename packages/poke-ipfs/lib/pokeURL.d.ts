import { IPokeReturnBase, IPokeOptions } from './types';
export declare function pokeURL(ipfsURL: URL | string, options?: IPokeOptions): Promise<(Pick<IPokeReturnBase, "status" | "statusText" | "error" | "headers"> & {
    value: string;
}) | (Pick<IPokeReturnBase, "status" | "statusText" | "error" | "headers"> & {
    value: false;
}) | (Pick<IPokeReturnBase, "value" | "status" | "statusText" | "headers"> & {
    error: Error;
})>;
export default pokeURL;
