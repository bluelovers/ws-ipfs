/**
 * Created by user on 2020/2/21.
 */

import { toLink, toURL, EnumIPFSLinkType } from '../index';

console.log(toURL(`Qmdbkxdh8tUA7zcnmcU6Nu7B7bNtubYTBjUHes799tgu83`, '001.png'))

console.log(toLink(`Qmdbkxdh8tUA7zcnmcU6Nu7B7bNtubYTBjUHes799tgu83`, {
	type: EnumIPFSLinkType.ipfs,
}))
