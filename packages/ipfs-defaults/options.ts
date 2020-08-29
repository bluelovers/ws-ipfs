import { merge, uniq, defaultsDeep } from 'lodash';
import mergeDefaultEXPERIMENTAL from './EXPERIMENTAL';

export function mergeDefaultOptions<T extends Record<any, any>>(options = {} as Partial<T>): T
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
		migrate: true,
	}, defaultsDeep(options, {}))
}

export default mergeDefaultOptions
