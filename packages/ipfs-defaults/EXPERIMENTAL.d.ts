export declare function mergeDefaultEXPERIMENTAL(EXPERIMENTAL?: {}): {
    pubsub: boolean;
    ipnsPubsub: boolean;
    sharding: boolean;
    dht: boolean;
    FilestoreEnabled: boolean;
    Libp2pStreamMounting: boolean;
    P2pHttpProxy: boolean;
    PreferTLS: boolean;
    QUIC: boolean;
    ShardingEnabled: boolean;
    UrlstoreEnabled: boolean;
};
export default mergeDefaultEXPERIMENTAL;
