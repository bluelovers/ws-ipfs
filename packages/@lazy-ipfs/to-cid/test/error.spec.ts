import toCID from '../index';
import toURL from 'to-ipfs-url';

describe(`describe`, () =>
{

	test(`test`, () =>
	{

		expect(() => toCID(void 0)).toThrowError();

		expect(() => toCID(null)).toThrowError();

		expect(() => toCID(0 as any)).toThrowError()
		expect(() => toCID(0 as any)).toThrowError()
		expect(() => toCID(true as any)).toThrowError()
		expect(() => toCID(false as any)).toThrowError()
		expect(() => toCID([] as any)).toThrowError()
		expect(() => toCID({} as any)).toThrowError()

	});

})
