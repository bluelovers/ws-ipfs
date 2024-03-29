# README.md

    detect input cid is js-multiformats or js-cid

## install

```bash
yarn add @lazy-ipfs/detect-cid-lib
yarn-tool add @lazy-ipfs/detect-cid-lib
yt add @lazy-ipfs/detect-cid-lib
```

```ts
import typeofCID, { EnumTypeofCID, isJsCID, isMultiformatsCID } from '@lazy-ipfs/detect-cid-lib';
import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';

describe(`describe`, () =>
{

	test(EnumTypeofCID.js_cid, () =>
	{
		const cid = new JsCID('bafybeidw5mmxmimpuzo7wiwmhwvea2zalug5djderubacu2aqnneva6zwy');

		let actual = typeofCID(cid);
		let expected = EnumTypeofCID.js_cid;

		console.dir(cid)

		expect(cid.multihash).toMatchSnapshot();
		expect(cid).toMatchSnapshot();
		expect(actual).toStrictEqual(expected);
		expect(isJsCID(cid)).toBeTruthy();

	});

	test(EnumTypeofCID.multiformats_cid, () =>
	{
		const cid = MultiformatsCID.parse('bafybeidw5mmxmimpuzo7wiwmhwvea2zalug5djderubacu2aqnneva6zwy');

		let actual = typeofCID(cid);
		let expected = EnumTypeofCID.multiformats_cid;

		console.dir(cid)

		expect(cid.multihash).toMatchSnapshot();
		expect(cid).toMatchSnapshot();
		expect(actual).toStrictEqual(expected);
		expect(isMultiformatsCID(cid)).toBeTruthy();

	});

})
```
