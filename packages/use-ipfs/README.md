# README.md

    lazy way for create or connect ipfs

## install

```bash
yarn add use-ipfs ipfs ipfsd-ctl ipfs-http-client
```

```typescript
import useIPFS from 'use-ipfs';

useIPFS()
	.then(async (value) => {

		console.log(await value.ipfs.id())

		return value.stop();
	})
;
```
