import fetchIPFS from '../index';
import raceFetchIPFS from '../race';
import { filterList } from 'ipfs-server-list';
import publishToIPFSRace from '../lib/put/race';
import { readFileSync } from 'fs';
import { join } from 'path';
import { handleClientList } from '../lib/handleClientList';

describe(`fetch-ipfs`, () =>
{

	const testData = Object.freeze({
		cid: `Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a`,
		length: 32,
	})

	const apis = filterList('API');

	test(`fetchIPFS`, async (done) =>
	{

		let actual = await fetchIPFS(testData.cid);

		expect(actual).toHaveLength(testData.length);
		expect(actual).toMatchSnapshot();

		done();
	});

	test(`raceFetchIPFS`, async (done) =>
	{

		let actual = await raceFetchIPFS(testData.cid, apis);

		expect(actual).toHaveLength(testData.length);
		expect(actual).toMatchSnapshot();

		done();
	});

	test(`publishToIPFSRace`, async (done) =>
	{

		let data = await readFileSync(join(__dirname, 'res', 'demo.png'));
		let cid = `QmdPAhQRxrDKqkGPvQzBvjYe3kU8kiEEAd2J6ETEamKAD9`;

		let actual = await publishToIPFSRace(data, apis);

		expect(actual).toMatchSnapshot();

		expect(actual[0].status).toStrictEqual(`fulfilled`);

		let target = actual[0].value[0];

		expect(target).toMatchSnapshot();
		expect(target.cid.toString()).toStrictEqual(cid);
		expect(target.path).toStrictEqual(cid);

		done();
	});

	test(`handleClientList`, async (done) =>
	{

		let actual = await handleClientList(apis);

		expect(actual).toHaveLength(1);
		expect(typeof actual[0].cat).toStrictEqual('function');
		expect(typeof actual[0].get).toStrictEqual('function');

		expect(await actual[0].version()).toMatchSnapshot();

		done();
	});

})
