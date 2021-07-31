import toURL from '../index';

describe(`describe`, () =>
{

	test(`test`, () =>
	{

		expect(() => toURL(void 0)).toThrowError()
		expect(() => toURL(null)).toThrowError()
		expect(() => toURL(0 as any)).toThrowError()
		expect(() => toURL(0 as any)).toThrowError()
		expect(() => toURL(true as any)).toThrowError()
		expect(() => toURL(false as any)).toThrowError()
		expect(() => toURL([] as any)).toThrowError()
		expect(() => toURL({} as any)).toThrowError()

	});

})
