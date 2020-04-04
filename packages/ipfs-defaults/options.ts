import { merge, uniq, defaultsDeep } from 'lodash';
import mergeDefaultEXPERIMENTAL from './EXPERIMENTAL';

export function mergeDefaultOptions(options = {})
{
	return merge({
		EXPERIMENTAL: mergeDefaultEXPERIMENTAL(),
		relay: {
			enabled: true,
			hop: {
				enabled: true,
				active: true,
			},
			Pubsub: {
				Enabled: true,
			},
		},
		repoAutoMigrate: true,
	}, defaultsDeep(options, {}))
}

export default mergeDefaultOptions
