import { toURL, toLink, EnumIPFSLinkType } from '../index';

describe(`describe`, () =>
{

	test(`toURL`, () =>
	{

		let actual = toURL(`Qmdbkxdh8tUA7zcnmcU6Nu7B7bNtubYTBjUHes799tgu83`, '001.png');
		let expected = "https://ipfs.io/ipfs/Qmdbkxdh8tUA7zcnmcU6Nu7B7bNtubYTBjUHes799tgu83?filename=001.png";


		expect(actual).toMatchSnapshot();
		expect(actual.toString()).toStrictEqual(expected);

	});

	test(`toLink:ipfs`, () =>
	{

		let actual = toLink(`Qmdbkxdh8tUA7zcnmcU6Nu7B7bNtubYTBjUHes799tgu83`, {
			type: EnumIPFSLinkType.ipfs,
		});
		let expected = "https://ipfs.io/ipfs/Qmdbkxdh8tUA7zcnmcU6Nu7B7bNtubYTBjUHes799tgu83";


		expect(actual).toMatchSnapshot();
		expect(actual.toString()).toStrictEqual(expected);

	});

})
