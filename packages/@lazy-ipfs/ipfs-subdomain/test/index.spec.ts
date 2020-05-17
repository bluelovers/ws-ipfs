import ipfsSubdomain, { ipfsSubdomainURL } from '../index';
import { getIpfsServerList } from 'ipfs-server-list';

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
