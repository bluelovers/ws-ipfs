# README.md

    ipfs-http-client with auto search go-ipfs, js-ipfs

## install

```bash
yarn add @bluelovers/ipfs-http-client ipfs-http-client
```

```ts
import ipfsClient from '@bluelovers/ipfs-http-client';

// auto detect go-ipfs and js-ipfs
ipfsClient()
	.then(async (ipfs) => {
		console.log(await ipfs.id())
	})
;
```

