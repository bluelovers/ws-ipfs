import toCID, { toRawCID } from '../index';

test(`toCID:string`, () =>
{
	let cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	let actual = toCID(cid);
	let expected = cid;

	expect(actual.toV0().toString()).toStrictEqual(cid);

	expect(actual).toMatchSnapshot({
		multihash: expect.any(Buffer),
	});

	expect(actual.toV0().toString()).toMatchSnapshot();
	expect(actual.toV1().toString()).toMatchSnapshot();

});

test(`toCID:CID`, () =>
{
	let cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	let expected = toCID(cid);
	let actual = toCID(expected);

	expect(actual.toV0().toString()).toStrictEqual(cid);
	expect(actual).toMatchSnapshot(expected);

	expect(actual.toV0().toString()).toMatchSnapshot();
	expect(actual.toV1().toString()).toMatchSnapshot();

});

test(`toCID:raw`, () =>
{
	let cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	let expected = toCID(cid);
	let actual = toCID({
		"version": 0,
		"codec": "dag-pb",
		"multibaseName": "base58btc",
		multihash: Buffer.from([
			18,  32, 183, 254,   8,  30, 244,  17,
			96, 165, 123,  89,  19,  86,  24,  96,
			118, 229, 238, 199, 116,   2,  56,  83,
			37, 188,  26,   8,  22, 181, 187, 118,
			74, 219
		]),
	});

	expect(actual.toV0().toString()).toStrictEqual(cid);
	expect(actual).toMatchSnapshot(expected);

	expect(actual.toV0().toString()).toMatchSnapshot();
	expect(actual.toV1().toString()).toMatchSnapshot();

});

test(`toCID:raw without multibaseName`, () =>
{
	let cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	let expected = toCID(cid);
	let actual = toCID({
		"version": 0,
		"codec": "dag-pb",
		multihash: Buffer.from([
			18,  32, 183, 254,   8,  30, 244,  17,
			96, 165, 123,  89,  19,  86,  24,  96,
			118, 229, 238, 199, 116,   2,  56,  83,
			37, 188,  26,   8,  22, 181, 187, 118,
			74, 219
		]),
	});

	expect(actual.toV0().toString()).toStrictEqual(cid);
	expect(actual).toMatchSnapshot(expected);

	expect(actual.toV0().toString()).toMatchSnapshot();
	expect(actual.toV1().toString()).toMatchSnapshot();

});
