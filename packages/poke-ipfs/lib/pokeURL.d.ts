import { IPokeReturnBase, IPokeOptions } from './types';
export declare function pokeURL(ipfsURL: URL | string, options?: IPokeOptions): Promise<(Omit<IPokeReturnBase, "value"> & {
    value: string;
}) | (Omit<IPokeReturnBase, "value"> & {
    value: false;
}) | (Omit<IPokeReturnBase, "error"> & {
    error: Error;
})>;
export default pokeURL;
