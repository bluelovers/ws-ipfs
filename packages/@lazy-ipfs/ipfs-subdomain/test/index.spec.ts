import ipfsSubdomain, { ipfsSubdomainURL } from '../index';
import { getIpfsServerList } from 'ipfs-server-list';
import { parsePath } from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';

test(`ipfsSubdomain`, () =>
{
	let cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	let actual = ipfsSubdomain(cid);
	let expected;

	expect(actual).toMatchSnapshot();
	expect(() => new URL(actual)).not.toThrow();

});

test(`ipfsSubdomainURL`, () =>
{
	let cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	let actual = ipfsSubdomainURL(cid);
	let expected;

	expect(actual).toMatchSnapshot();

});

test(`ipfsSubdomain:fleek`, () =>
{
	let cid = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	let actual = ipfsSubdomain(cid, getIpfsServerList().fleek);
	let expected;

	expect(actual).toMatchSnapshot();
	expect(() => new URL(actual)).not.toThrow();

});

test(`ipfsSubdomainURL with path`, () =>
{
	let cid = 'bafybeigyzswwpp2t676ndmdxgi6qkhppugz7wdobsczod5ssas4qgsyeay/dmzj';

	let actual = ipfsSubdomainURL(cid);
	let expected;

	expect(actual).toHaveProperty('pathname', '/dmzj');
	expect(actual).toMatchSnapshot();

	actual = ipfsSubdomainURL('/ipfs/' + cid);

	expect(actual).toHaveProperty('pathname', '/dmzj');
	expect(actual).toMatchSnapshot();

	let actual2 = ipfsSubdomain('/ipfs/' + cid, null, null, {
		clearPathname: true,
	});

	expect(actual2).not.toContain('dmzj');
	expect(actual2).toMatchSnapshot();

	let actual3 = ipfsSubdomain('/ipfs/' + cid, null, {
		clearPathname: true,
	});

	expect(actual3).toStrictEqual(actual2);
});

test(`ipfsSubdomain:ParsePathResult`, () =>
{
	let cid = parsePath('Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a', {
		unsafeReturn: true,
		noThrow: true,
	});

	let actual = ipfsSubdomain(cid);
	let expected;

	expect(actual).toMatchSnapshot();
	expect(() => new URL(actual)).not.toThrow();

});
