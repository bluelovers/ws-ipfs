import { IIPFSNameApi } from 'ipfs-types/lib/ipfs/name';
import { runSubCheck } from '../util';

export async function name(ipfs: IIPFSNameApi)
{
	let publish = await runSubCheck(async () =>
	{
		const addr = '/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'

		const res = await ipfs.name.publish(addr, {
			timeout: 5000,
		})

		return res.name && res.value === addr;
	});

	let cancel = await runSubCheck(async () =>
	{
		const name = 'QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm'

		const result = await ipfs.name.pubsub.cancel(name)

		return typeof result.canceled === 'boolean'
	});

	let state = await runSubCheck(async () =>
	{
		const name = 'QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm'

		const result = await ipfs.name.pubsub.state()

		//console.dir(result);

		return typeof result.enabled === 'boolean'
	});

	let subs = await runSubCheck(async () =>
	{
		const name = 'QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm'

		const result = await ipfs.name.pubsub.subs()

		//console.dir(result);

		return typeof result.length === 'number'
	});

	let resolve = await runSubCheck(async () =>
	{
		const addr = '/ipns/ipfs.io'

		for await (const name of ipfs.name.resolve(addr))
		{
			//console.log(name)
			// /ipfs/QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm

			return typeof name === 'string'
		}
	});

	return {
		publish,
		pubsub: {
			cancel,
			state,
			subs,
		},
		resolve,
	}
}

export default name
