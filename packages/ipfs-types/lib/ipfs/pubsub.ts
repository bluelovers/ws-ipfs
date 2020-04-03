
export interface IIPFSPubsubHandler
{
	(msg: IIPFSPubsubMsg): any
}

export interface IIPFSPubsubMsg
{
	from: string,
	seqno: Buffer,
	data: Buffer,
	topicIDs: Array<string>
}

export interface IIPFSPubsubApiCore
{

	subscribe(topic: string, handler: IIPFSPubsubHandler, options?: {
		discover?: boolean
	}): Promise<void>
	unsubscribe(topic: string, handler?: IIPFSPubsubHandler): Promise<void>
	publish(topic: string, data: Buffer|string): Promise<void>

	/**
	 * Returns the list of subscriptions the peer is subscribed to.
	 */
	ls(): Promise<string[]>

	/**
	 * Returns the peers that are subscribed to one topic.
	 */
	peers(topic: string): Promise<string[]>

}

export interface IIPFSPubsubApi
{
	pubsub: IIPFSPubsubApiCore,
}
