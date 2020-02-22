import { createController } from 'ipfsd-ctl';
import { IOptions, fixIPFSOptions, checkIPFS } from '../index';
import { checkForRunningApi } from 'ipfsd-ctl/src/utils';
import IpfsClient from 'ipfs-http-client';
import { unlinkIPFSApi } from './util';

export async function startIPFS(options?: IOptions)
{
	let ipfsd = await createController(fixIPFSOptions(options));

	let addr = checkForRunningApi(ipfsd.path);
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
				await ipfs.stop();
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
