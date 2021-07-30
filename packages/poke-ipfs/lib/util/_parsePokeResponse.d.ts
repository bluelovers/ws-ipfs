import { IPokeReturnBase } from '../types';
export declare function _parsePokeResponse(res: Response): (Omit<IPokeReturnBase, "value"> & {
    value: string;
}) | (Omit<IPokeReturnBase, "value"> & {
    value: false;
});
export declare function _pokeError(error: Error, href: string): Omit<IPokeReturnBase, "error"> & {
    error: Error;
};
