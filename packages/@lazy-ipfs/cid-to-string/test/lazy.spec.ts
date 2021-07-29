import JsCID from 'cids';
import { EnumTypeofCID } from '@lazy-ipfs/detect-cid-lib';
import toCID from '@lazy-ipfs/to-cid';
import { CID as MultiformatsCID } from 'multiformats'
import { cidToString } from '../index';
import { bases as basesMap } from 'multiformats/basics';

describe(`BaseName`, () =>
{
	const cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	test(EnumTypeofCID.js_cids, () =>
	{
		let co = toCID(cid, JsCID);

		let actual01 = cidToString(co.toV1(), 'base32');
		let actual02 = cidToString(co, 'base58btc');

		expect(actual01).toMatchSnapshot();
		expect(actual02).toMatchSnapshot();

	});

	test(EnumTypeofCID.multiformats_cid, () =>
	{
		let co = toCID(cid, MultiformatsCID);

		let actual01 = cidToString(co.toV1(), 'base32');
		let actual02 = cidToString(co, 'base58btc');

		expect(actual01).toMatchSnapshot();
		expect(actual02).toMatchSnapshot();

	});

})

describe(`BaseCodec`, () =>
{
	const cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	test(EnumTypeofCID.js_cids, () =>
	{
		let co = toCID(cid, JsCID);

		let actual01 = cidToString(co.toV1(), basesMap['base32']);
		let actual02 = cidToString(co, basesMap['base58btc']);

		expect(actual01).toMatchSnapshot();
		expect(actual02).toMatchSnapshot();

	});

	test(EnumTypeofCID.multiformats_cid, () =>
	{
		let co = toCID(cid, MultiformatsCID);

		let actual01 = cidToString(co.toV1(), basesMap['base32']);
		let actual02 = cidToString(co, basesMap['base58btc']);

		expect(actual01).toMatchSnapshot();
		expect(actual02).toMatchSnapshot();

	});

})
