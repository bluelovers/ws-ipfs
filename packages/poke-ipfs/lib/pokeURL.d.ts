import { IPokeReturnBase, IPokeOptions } from './types';
export declare function pokeURL(ipfsURL: URL | string, options?: IPokeOptions): Promise<(Omit<IPokeReturnBase, "error"> & {
    error: Error;
}) | (Omit<IPokeReturnBase, "value"> & {
    value: string;
}) | (Omit<IPokeReturnBase, "value"> & {
    value: false;
})>;
export default pokeURL;
