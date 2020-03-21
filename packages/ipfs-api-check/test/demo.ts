import cat from '../lib/check/cat';
import useIPFS, { ICachedObject } from 'use-ipfs';
import ipfsServerList from 'ipfs-server-list';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';

useIPFS({}, {
	serverAddr: ipfsServerList['infura.io'].API,
	skipCheck: true,
})
	.then(async ({ ipfs }: ICachedObject<IIPFSPromiseApi>) => {

		console.log(await cat(ipfs))

		console.log(await ipfs.id().catch(err => err))

	})
;
