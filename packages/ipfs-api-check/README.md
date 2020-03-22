# README.md

    check ipfs api support

## install

```bash
yarn add ipfs-api-check
yarn-tool add ipfs-api-check
```

## demo

```typescript
import useIPFS, { ICachedObject } from 'use-ipfs';
import ipfsServerList from 'ipfs-server-list';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';
import checkAll from '../index';

useIPFS({}, {
	//serverAddr: ipfsServerList['infura.io'].API,
	skipCheck: true,
})
	.then(async ({
		ipfs,
		ipfsType,
		stop,
	}: ICachedObject<IIPFSPromiseApi>) => {

		console.dir(await checkAll(ipfs), {
			colors: true,
		})

		console.log(await ipfs.id().catch(err => String(err)))

		console.log(`[ipfsType]`, ipfsType)

		return stop();
	})
;
```

```js
{
  add: { success: true, spendTime: 101, error: undefined },
  cat: { success: true, spendTime: 15, error: undefined },
  dag: {
    put: { success: true, spendTime: 18, error: undefined },
    get: { success: true, spendTime: 80, error: undefined },
    tree: {
      success: undefined,
      spendTime: 0,
      error: TypeError: ipfs.dag.tree is not a function
    },
    resolve: { success: true, spendTime: 6, error: undefined }
  },
  get: { success: true, spendTime: 13, error: undefined },
  id: { success: true, spendTime: 12, error: undefined },
  ls: { success: true, spendTime: 11, error: undefined },
  object: {
    get: { success: true, spendTime: 10, error: undefined },
    data: { success: true, spendTime: 7, error: undefined },
    stat: { success: true, spendTime: 7, error: undefined }
  },
  pin: { add: { success: true, spendTime: 36, error: undefined } },
  refs: { success: true, spendTime: 9, error: undefined },
  version: { success: true, spendTime: 8, error: undefined }
}
```
