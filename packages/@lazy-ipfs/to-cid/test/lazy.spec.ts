import { toCID } from '@lazy-ipfs/to-cid';
import { handleCID } from 'fetch-ipfs/util';
import { cidToString } from '@lazy-ipfs/cid-to-string';
import { parsePath } from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';
import JsCID from 'cids';
import { EnumTypeofCID } from '@lazy-ipfs/detect-cid-lib';
import { CID as MultiformatsCID } from 'multiformats';

const cidStr = 'QmTWsPwz1wrKSgpiKa5tyC3rWkWh3Kym6ikCSmwiGPsfqd';

describe(`describe`, () =>
{

	test(`url`, () =>
	{

		_check(handleCID(`https://ipfs.io/ipfs/${cidStr}?filename=wenku8_1508.epub`, true))

	});

	test(`/ipfs/hash`, () =>
	{

		_check(`ipfs/${cidStr}`)

	});

	test(`ParsePathResult`, () =>
	{

		_check(parsePath(cidStr, {
			unsafeReturn: true,
			noThrow: true,
		}))

	});

	test(EnumTypeofCID.js_cids, () =>
	{
		const oldCid = new JsCID(cidStr)

		_check(oldCid)

	});

	test(EnumTypeofCID.js_multiformats, () =>
	{
		const newCid = MultiformatsCID.parse(cidStr)

		_check(newCid)

	});

	test('cidStr', () =>
	{
		_check(cidStr)

	});

})

function _check(input)
{
	let actual = toCID(input);
	let expected = cidStr;

	expect(cidToString(actual)).toStrictEqual(expected);

	expect(actual).toMatchSnapshot();
	expect(cidToString(actual)).toMatchSnapshot();
}
