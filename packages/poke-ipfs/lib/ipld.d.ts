/**
 * Created by user on 2020/4/3.
 */
import { ICIDValue } from 'ipfs-types/lib/types';
import { IPokeReturnBase, IPokeOptions } from './types';
export declare function pokeIPLD(cid: ICIDValue, options?: IPokeOptions): Promise<(Pick<IPokeReturnBase, "status" | "statusText" | "error" | "headers"> & {
    value: true;
}) | (Pick<IPokeReturnBase, "status" | "statusText" | "error" | "headers"> & {
    value: false;
}) | (Pick<IPokeReturnBase, "value" | "status" | "statusText" | "headers"> & {
    error: Error;
})>;
export default pokeIPLD;
