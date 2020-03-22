import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs/index';
import { runSubCheck, isBufferMaybe } from '../util';
import { IIPFSPinApi } from 'ipfs-types/lib/ipfs/pin';
import { IIPFSObjectApi } from 'ipfs-types/lib/ipfs/object';
import { IIPFSDagApi } from 'ipfs-types/lib/ipfs/dag';

export async function dag(ipfs: IIPFSDagApi)
{
	const obj = {
		a: 1,
		b: [1, 2, 3],
		c: {
			ca: [5, 6, 7],
			cb: 'foo'
		}
	}

	const expected = 'bafyriqh7xeacdjivmpfzvskv3mxzok3mrlbqgbmorbmyaypnilifgpd3fexfrrfy4pcfzkm2ypnr2v5bpscv7aqchw6kebavald4mqp2wgrne';

	const put = await runSubCheck(async () =>
	{
		const cid = await ipfs.dag.put(obj, { format: 'dag-cbor', hashAlg: 'sha3-512', timeout: 5000, })

		//console.log(cid.toString())

		return cid.toString() === expected
	});

	const get = await runSubCheck(async () =>
	{
		let r1 = await getValue(`${expected}/a`);
		let r2 = await getValue(`${expected}/b`);
		let r3 = await getValue(`${expected}/c`);
		let r4 = await getValue(`${expected}/c/ca/1`);

		return obj.a === r1
		|| r2.length === obj.b.length
		|| r3.cb === obj.c.cb
		|| r4 === obj.c.ca[1]
			;
	});

	const tree = await runSubCheck(async () =>
	{
		const result = await ipfs.dag.tree(expected, void 0, {
			timeout: 5000,
		})

		//console.dir(result);

		return result.length
	});

	const resolve = await runSubCheck(async () =>
	{
		const result = await ipfs.dag.resolve(expected, void 0, {
			timeout: 5000,
		})

		//console.dir(result)

		return result.cid
	});

	async function getValue<T = any>(cidPath: string)
	{
		const result = await ipfs.dag.get<T>(cidPath, void 0, {
			timeout: 5000,
		})

		return result.value
	}

	return {
		put,
		get,
		tree,
		resolve,
	}
}

export default dag
