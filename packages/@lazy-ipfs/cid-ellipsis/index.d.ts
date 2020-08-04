import CID from 'cids';
export declare function cidStartAndEnd(value: string, sep?: string): {
    value: string;
    start: string;
    end: string;
    sep: string;
};
export declare function cidEllipsis(value: string | CID, sep?: string): string;
export default cidEllipsis;
