/**
 * Created by user on 2020/4/3.
 */
import { ICIDValue } from 'ipfs-types/lib/types';
import { IPokeReturnBase } from './types';
export declare function pokeIPLD(cid: ICIDValue): Promise<(Pick<IPokeReturnBase, "status" | "statusText" | "error"> & {
    value: true;
}) | (Pick<IPokeReturnBase, "status" | "statusText" | "error"> & {
    value: false;
}) | (Pick<IPokeReturnBase, "value" | "status" | "statusText"> & {
    error: Error;
})>;
export default pokeIPLD;
