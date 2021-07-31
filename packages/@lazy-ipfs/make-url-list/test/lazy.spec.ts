import { parsePath } from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';
import lazyMakeIpfsAllServerURL from '../index';
import { toCID } from '@lazy-ipfs/to-cid';
import { toSubdomainCID } from '@lazy-ipfs/ipfs-subdomain/index';
import { cidToBase32 } from '@lazy-ipfs/cid-to-string';
import { cidToQmHash } from '@lazy-ipfs/cid-to-string/index';
import { toURL } from 'to-ipfs-url';

describe(`describe`, () =>
{

	const cidStr = 'QmTWsPwz1wrKSgpiKa5tyC3rWkWh3Kym6ikCSmwiGPsfqd';

	test(`ParsePathResult`, () =>
	{
		const cid = parsePath(cidStr, {
			unsafeReturn: true,
			noThrow: true,
		});

		_check(cid)

	});

	test(`cidStr`, () =>
	{
		const cid = cidStr;

		_check(cid)

	});

	test(`toCID`, () =>
	{
		const cid = toCID(cidStr);

		_check(cid)

	});

	test(`toSubdomainCID`, () =>
	{
		const cid = toSubdomainCID(cidStr);

		_check(cid)

	});

	test(`cidToBase32`, () =>
	{
		const cid = cidToBase32(toCID(cidStr));

		_check(cid)

	});

	test(`cidToQmHash`, () =>
	{
		const cid = cidToQmHash(toCID(cidStr));

		_check(cid)

	});

	test(`toURL`, () =>
	{
		const cid = toURL(cidStr);

		_check(cid)

	});

})

function _check(cid)
{
	expect(cid).toMatchSnapshot();

	let actual = lazyMakeIpfsAllServerURL(cid);

	expect(actual).toMatchSnapshot();

	let actual2 = lazyMakeIpfsAllServerURL(cid, {
		handleOptions: {
			filename: '7777.epub',
		},
	});

	expect(actual).not.toEqual(actual2);
}
