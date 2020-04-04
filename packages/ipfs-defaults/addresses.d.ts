/**
 * Created by user on 2020/4/4.
 */
export declare type IPort = number | string;
export declare type IType = 'js' | 'go';
export declare function getDefaultAddressesPorts(ports?: {
    Swarm?: IPort;
    Swarm2?: IPort;
    API?: IPort;
    Gateway?: IPort;
}, type?: IType | string): {
    Swarm: number;
    Swarm2?: number;
    API: number;
    Gateway: number;
};
export declare function createDefaultAddresses(ports?: {
    Swarm?: IPort;
    Swarm2?: IPort;
    API?: IPort;
    Gateway?: IPort;
}, type?: IType | string): {
    Swarm: string[];
    API: string;
    Gateway: string;
};
export default createDefaultAddresses;
