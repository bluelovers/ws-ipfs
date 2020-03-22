import useIPFS, { ICachedObject } from 'use-ipfs';
import ipfsServerList from 'ipfs-server-list';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';
import checkAll from '../index';
import { inspect } from 'util';

inspect.defaultOptions.colors = true;
inspect.defaultOptions.depth = 5;

useIPFS({}, {
	//serverAddr: ipfsServerList['infura.io'].API,
	//skipCheck: true,
})
	.then(async ({
		ipfs,
		ipfsType,
		stop,
	}: ICachedObject<IIPFSPromiseApi>) => {

		console.dir(await checkAll(ipfs))

		console.log(await ipfs.id().catch(err => String(err)))

		console.log(`[ipfsType]`, ipfsType)

		return stop();
	})
;
