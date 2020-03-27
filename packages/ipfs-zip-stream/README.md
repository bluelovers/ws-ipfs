# README.md

    get files from zip for ipfs.add

```typescript
import { readFile } from 'fs-extra';
import { join } from 'path';
import { fromBuffer, fromJSZip } from 'ipfs-zip-stream';
import publishToIPFSRace from 'fetch-ipfs/lib/put/race';
import { filterList } from 'ipfs-server-list/index';
import JSZip from 'jszip';
import useIPFS from 'use-ipfs';

(async () =>
{

	let ls = fromBuffer(readFile(join(__dirname, 'res', 'wenku8_2324.epub')))

	const { ipfs, stop } = await useIPFS();

	await publishToIPFSRace(ls, [
		ipfs,
	], {
		addOptions: {
			pin: false,
			wrapWithDirectory: true,
		}
	})
		.then(ls =>
		{
			// @ts-ignore
			let last = ls[0].value[ls[0].value.length - 1];

			console.dir(last)
			console.dir(last.cid.toString())

		})
	;

	//return stop()
})();
```
