
export interface IIPFSPubsubApiCore
{

	subscribe(topic, handler, options?)
	unsubscribe(topic, handler)
	publish(topic, data)
	ls()
	peers(topic)

}

export interface IIPFSPubsubApi
{
	pubsub: IIPFSPubsubApiCore,
}
