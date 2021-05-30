import { IPokeReturnBase, IPokeOptions, ICIDValue } from './types';
export declare function pokeIPLD(cid: ICIDValue, options?: IPokeOptions): Promise<(Omit<IPokeReturnBase, "value"> & {
    value: true;
}) | (Omit<IPokeReturnBase, "value"> & {
    value: false;
}) | (Omit<IPokeReturnBase, "error"> & {
    error: Error;
})>;
export default pokeIPLD;
