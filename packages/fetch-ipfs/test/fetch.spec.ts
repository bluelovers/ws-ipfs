import fetchIPFS from '../index';
import raceFetchIPFS from '../race';
import { filterList } from 'ipfs-server-list';
import publishToIPFSRace from '../lib/put/race';
import { readFileSync } from 'fs';
import { join } from 'path';
import { handleClientList } from '../lib/handleClientList';
import { jest } from '@jest/globals';
import Bluebird from 'bluebird';

jest.setTimeout(1000 * 60 * 20);

describe(`fetch-ipfs`, () =>
{

	const testData = Object.freeze({
		cid: `Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a`,
		length: 32,
	})

	const apis = filterList('API');

	/**
	 * @FIXME: Jest did not exit one second after the test run has completed.
	 */
	test.skip(`fetchIPFS`, async () =>
	{
		await fetchIPFS(testData.cid)
			.then(actual => {
				expect(actual).toHaveLength(testData.length);
				expect(actual).toMatchSnapshot();
			})
			.catch(e => {

				if (e instanceof Error && e.message.includes('Too Many Requests'))
				{
					return null
				}
			})
		;

		return Bluebird.delay(60 * 1000)
	});

	test(`raceFetchIPFS`, async () =>
	{

		let actual = await raceFetchIPFS(testData.cid, apis, 5000);

		expect(actual).toHaveLength(testData.length);
		expect(actual).toMatchSnapshot();
	});

	test(`publishToIPFSRace`, async () =>
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
	});

	test(`handleClientList`, async () =>
	{

		let actual = await handleClientList(apis);

		expect(actual).toHaveLength(1);
		expect(typeof actual[0].cat).toStrictEqual('function');
		expect(typeof actual[0].get).toStrictEqual('function');

		expect(await actual[0].version()).toHaveProperty('version');
	});

})
