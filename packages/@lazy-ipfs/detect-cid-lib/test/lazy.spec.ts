import typeofCID, { EnumTypeofCID} from '../index';
import JsCID from 'cids';
import { CID as MultiformatsCID } from 'multiformats';
import { isMultiformatsCID } from '../lib/js-multiformats';
import { isJsCID } from '../lib/js-cids';

describe(`describe`, () =>
{

	test(EnumTypeofCID.js_cids, () =>
	{
		const cid = new JsCID('bafybeidw5mmxmimpuzo7wiwmhwvea2zalug5djderubacu2aqnneva6zwy');

		let actual = typeofCID(cid);
		let expected = EnumTypeofCID.js_cid;

		console.dir(cid)

		expect(cid.multihash).toMatchSnapshot();
		expect(cid).toMatchSnapshot();
		expect(actual).toStrictEqual(expected);
		expect(isJsCID(cid)).toBeTruthy();

	});

	test(EnumTypeofCID.multiformats_cid, () =>
	{
		const cid = MultiformatsCID.parse('bafybeidw5mmxmimpuzo7wiwmhwvea2zalug5djderubacu2aqnneva6zwy');

		let actual = typeofCID(cid);
		let expected = EnumTypeofCID.multiformats_cid;

		console.dir(cid)

		expect(cid.multihash).toMatchSnapshot();
		expect(cid).toMatchSnapshot();
		expect(actual).toStrictEqual(expected);
		expect(isMultiformatsCID(cid)).toBeTruthy();

	});

})
