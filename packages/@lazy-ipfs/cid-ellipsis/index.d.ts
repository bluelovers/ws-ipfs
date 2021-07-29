import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';
export declare function cidStartAndEnd(value: string, sep?: string): {
    value: string;
    start: string;
    end: string;
    sep: string;
};
export declare function cidEllipsis(value: ICIDValue, sep?: string): string;
export default cidEllipsis;
