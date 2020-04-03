export declare function pokeURL(ipfsURL: URL | string): Promise<{
    value: string;
    status: number;
    statusText: string;
} | {
    value: false;
    status: number;
    statusText: string;
} | {
    status: number;
    statusText: string;
    value?: undefined;
} | {
    error: Error;
}>;
export default pokeURL;
