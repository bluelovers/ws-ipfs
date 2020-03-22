import { createController } from 'ipfsd-ctl';
import { checkForRunningApi } from 'ipfsd-ctl/src/utils';
import IpfsClient from 'ipfs-http-client';
import { unlinkIPFSApi } from './util/fs';
import { checkIPFS } from './util';
import { IOptions } from './types';
import { fixIPFSOptions } from './util/ipfsd';

export async function startIPFS(options?: IOptions)
{
	let ipfsd = await createController(fixIPFSOptions(options));

	let addr = await checkForRunningApi(ipfsd.path);
	if (addr)
	{
		let ipfs;
		try
		{
			ipfs = await IpfsClient(addr);
			await checkIPFS(ipfs);
		}
		catch (e)
		{
			try
			{
				await ipfs.stop();
			}
			catch (e)
			{}

			await unlinkIPFSApi(ipfsd.path);
		}
		finally
		{
			try
			{
				//await ipfs.stop();
			}
			catch (e)
			{}

			ipfs = void 0;
		}
	}

	!ipfsd.initialized && await ipfsd.init();
	!ipfsd.started && await ipfsd.start();

	await checkIPFS(ipfsd.api);

	return ipfsd
}

export default startIPFS
