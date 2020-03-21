import cat from '../lib/check/cat';
import useIPFS, { ICachedObject } from 'use-ipfs';
import ipfsServerList from 'ipfs-server-list';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';
import checkAll from '../index';

useIPFS({}, {
	serverAddr: ipfsServerList['infura.io'].API,
	skipCheck: true,
})
	.then(async ({ ipfs, stop }: ICachedObject<IIPFSPromiseApi>) => {

		console.dir(await checkAll(ipfs), {
			colors: true,
		})

		console.log(await ipfs.id().catch(err => String(err)))


		return stop();
	})
;
