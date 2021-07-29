import toCID, { toRawCID } from '../index';
import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';

const libCID = MultiformatsCID;

test(`toCID:string`, () =>
{
	let cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	let actual = toCID(cid, libCID);
	let expected = cid;

	expect(actual.toV0().toString()).toStrictEqual(cid);

	expect(actual).toMatchSnapshot({
		multihash: {
			bytes: expect.any(Uint8Array),
		},
	});

	expect(actual.toV0().toString()).toMatchSnapshot();
	expect(actual.toV1().toString()).toMatchSnapshot();

});

test(`toCID:CID`, () =>
{
	let cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	let expected = toCID(cid, libCID);
	let actual = toCID(expected, libCID);

	expect(actual.toV0().toString()).toStrictEqual(cid);
	expect(actual).toMatchSnapshot(expected as any);

	expect(actual.toV0().toString()).toMatchSnapshot();
	expect(actual.toV1().toString()).toMatchSnapshot();

});

test(`toCID:raw`, () =>
{
	let cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	let expected = toCID(cid, libCID);
	let actual = toCID({
		"version": 0,
		"codec": "dag-pb",
		"multibaseName": "base58btc",
		multihash: Uint8Array.from([
			18,  32, 183, 254,   8,  30, 244,  17,
			96, 165, 123,  89,  19,  86,  24,  96,
			118, 229, 238, 199, 116,   2,  56,  83,
			37, 188,  26,   8,  22, 181, 187, 118,
			74, 219
		]),
	}, libCID);

	expect(actual.toV0().toString()).toStrictEqual(cid);
	expect(actual).toMatchSnapshot(expected as any);

	expect(actual.toV0().toString()).toMatchSnapshot();
	expect(actual.toV1().toString()).toMatchSnapshot();

});

test(`toCID:raw without multibaseName`, () =>
{
	let cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	let expected = toCID(cid, libCID);
	let actual = toCID({
		"version": 0,
		"codec": "dag-pb",
		multihash: Uint8Array.from([
			18,  32, 183, 254,   8,  30, 244,  17,
			96, 165, 123,  89,  19,  86,  24,  96,
			118, 229, 238, 199, 116,   2,  56,  83,
			37, 188,  26,   8,  22, 181, 187, 118,
			74, 219
		]),
	}, libCID);

	expect(actual.toV0().toString()).toStrictEqual(cid);
	expect(actual).toMatchSnapshot(expected as any);

	expect(actual.toV0().toString()).toMatchSnapshot();
	expect(actual.toV1().toString()).toMatchSnapshot();

});
