#!/usr/bin/env node

import useIPFS from 'use-ipfs';

export default useIPFS()
	.then(async ({
		ipfs,
		address,
	}) => {

		console.log(await address());

		return ipfs
	})
;
