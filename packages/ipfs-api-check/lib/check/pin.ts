import { IIPFSFileApi } from 'ipfs-types/lib/ipfs/file';
import { IIPFSApiUtils } from 'ipfs-types/lib/ipfs/index';
import { runSubCheck } from '../util';
import { IIPFSPinApi } from 'ipfs-types/lib/ipfs/pin';

export async function pin(ipfs: IIPFSPinApi)
{
	let add = await runSubCheck(async () =>
	{
		const pinset = await ipfs.pin.add('QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u', {
			timeout: 5000,
		})

		return pinset.length && pinset[0].cid;
	});

	return {
		add,
	}
}

export default pin
