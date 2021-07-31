import { toCID } from '@lazy-ipfs/to-cid';
import { handleCID } from 'fetch-ipfs/util';
import { cidToString } from '@lazy-ipfs/cid-to-string';
import { parsePath } from '@lazy-ipfs/parse-ipfs-path/lib/parsePath';

describe(`describe`, () =>
{

	test(`url`, () =>
	{

		let actual = toCID(handleCID('https://ipfs.io/ipfs/QmTWsPwz1wrKSgpiKa5tyC3rWkWh3Kym6ikCSmwiGPsfqd?filename=wenku8_1508.epub', true));
		let expected = 'QmTWsPwz1wrKSgpiKa5tyC3rWkWh3Kym6ikCSmwiGPsfqd';

		expect(cidToString(actual)).toStrictEqual(expected);

		expect(actual).toMatchSnapshot();
		expect(cidToString(actual)).toMatchSnapshot();

	});

	test(`/ipfs/hash`, () =>
	{

		let actual = toCID('ipfs/QmTWsPwz1wrKSgpiKa5tyC3rWkWh3Kym6ikCSmwiGPsfqd');
		let expected = 'QmTWsPwz1wrKSgpiKa5tyC3rWkWh3Kym6ikCSmwiGPsfqd';

		expect(cidToString(actual)).toStrictEqual(expected);

		expect(actual).toMatchSnapshot();
		expect(cidToString(actual)).toMatchSnapshot();

	});

	test(`ParsePathResult`, () =>
	{

		let actual = toCID(parsePath('QmTWsPwz1wrKSgpiKa5tyC3rWkWh3Kym6ikCSmwiGPsfqd', {
			unsafeReturn: true,
			noThrow: true,
		}));
		let expected = 'QmTWsPwz1wrKSgpiKa5tyC3rWkWh3Kym6ikCSmwiGPsfqd';

		expect(cidToString(actual)).toStrictEqual(expected);

		expect(actual).toMatchSnapshot();
		expect(cidToString(actual)).toMatchSnapshot();

	});

})
