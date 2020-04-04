/**
 * Created by user on 2020/2/27.
 */

import { IOptions } from '../types';
import defaultsDeep from 'lodash/defaultsDeep';
import { mergeDefaultConfig, mergeDefaultOptions } from 'ipfs-defaults';

export function fixIPFSOptions(options?: IOptions)
{
	options = defaultsDeep({}, options, {
		type: 'js',
		//ipfsModule: require('ipfs'),
		//ipfsHttpModule: require('ipfs-http-client'),
		//ipfsBin: require.resolve('ipfs/src/cli/bin.js'),
		ipfsOptions: mergeDefaultOptions({
			config: mergeDefaultConfig(options?.ipfsOptions?.config),
		}),
		disposable: false,
	});

	if (options.type === 'js' || options.type === 'proc')
	{
		if (typeof options.ipfsModule === 'undefined')
		{
			options.ipfsModule = require('ipfs')
		}
		if (typeof options.ipfsHttpModule === 'undefined')
		{
			options.ipfsHttpModule = require('ipfs-http-client')
		}
		if (typeof options.ipfsBin === 'undefined')
		{
			options.ipfsBin = require.resolve('ipfs/src/cli/bin.js')
		}
	}

	return options;
}
