export interface IIPFSPubsubApiCore {
    subscribe(topic: any, handler: any, options?: any): any;
    unsubscribe(topic: any, handler: any): any;
    publish(topic: any, data: any): any;
    ls(): any;
    peers(topic: any): any;
}
export interface IIPFSPubsubApi {
    pubsub: IIPFSPubsubApiCore;
}
