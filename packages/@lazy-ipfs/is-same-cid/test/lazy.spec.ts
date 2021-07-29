import isSameCID from '../index';
import { toCID } from '@lazy-ipfs/to-cid';
import cidToString from '@lazy-ipfs/cid-to-string/index';

describe(`describe`, () =>
{
	const cid1 = 'bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m';
	const cid2 = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';

	test(`test`, () =>
	{
		const co1 = toCID(cid1);
		const co2 = toCID(cid2);

		expect(isSameCID(cid1, cid2)).toBeTruthy();


		expect(isSameCID(co1, cid2)).toBeTruthy();
		expect(isSameCID(cid1, co2)).toBeTruthy();

		expect(isSameCID(co1.toV1(), cid2)).toBeTruthy();
		expect(isSameCID(co1.toV0(), cid2)).toBeTruthy();
		expect(isSameCID(cid1, co2.toV1())).toBeTruthy();
		expect(isSameCID(cid1, co2.toV0())).toBeTruthy();

		expect(isSameCID(co1.toV1().toString(), cid2)).toBeTruthy();
		expect(isSameCID(co1.toV0().toString(), cid2)).toBeTruthy();
		expect(isSameCID(cid1, co2.toV1().toString())).toBeTruthy();
		expect(isSameCID(cid1, co2.toV0().toString())).toBeTruthy();

	});

})
