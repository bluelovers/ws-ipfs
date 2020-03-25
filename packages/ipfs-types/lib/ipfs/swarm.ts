export interface IIPFSSwarmApiCore
{
	addrs(): Promise<{
		id: String,
		addrs: string[],
	}>

	connect(addr: string): Promise<void>

	disconnect(addr: string): Promise<void>

	localAddrs(): Promise<string[]>

	peers(options?: {
		direction?: boolean,
		streams?: boolean,
		verbose?: boolean,
		latency?: boolean,
	}): Promise<{
		addr: string,
		peer: string,
		latency: string,
		muxer: string,
		streams: string[],
		direction: number,
	}[]>

}

export interface IIPFSSwarmApi
{
	swarm: IIPFSSwarmApiCore,
}
