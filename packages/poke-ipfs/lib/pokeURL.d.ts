import { IPokeReturnBase } from './types';
export declare function pokeURL(ipfsURL: URL | string): Promise<(Pick<IPokeReturnBase, "status" | "statusText" | "error"> & {
    value: string;
}) | (Pick<IPokeReturnBase, "status" | "statusText" | "error"> & {
    value: false;
}) | (Pick<IPokeReturnBase, "value" | "status" | "statusText"> & {
    error: Error;
})>;
export default pokeURL;
