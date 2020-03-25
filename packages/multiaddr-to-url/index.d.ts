export interface IMultiaddrToURLOptions {
    /**
     * When /tcp is the last (terminating) protocol HTTP is assumed by default (implicit assumeHttp: true)
     * this means produced URIs will start with http:// instead of tcp://
     * passing { assumeHttp: false } disables this behavior
     *
     * @default true
     */
    assumeHttp?: boolean;
}
export declare function multiaddrToURL(multiaddr: string, opts?: IMultiaddrToURLOptions): URL;
export default multiaddrToURL;
