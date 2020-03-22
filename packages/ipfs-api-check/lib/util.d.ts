export declare type IRunCheck<E extends Error = Error> = {
    success: boolean;
    spendTime: number;
    error: E;
};
export declare function runSubCheck<T, E extends Error = Error>(fn: () => T): Promise<IRunCheck<E>>;
