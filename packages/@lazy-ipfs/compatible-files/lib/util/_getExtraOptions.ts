import { IExtendOptions, IOptionsExtra } from '../types';

export function _getExtraOptions<T extends {} = {}, O extends {} = {}>(options: IExtendOptions<T, O>): IOptionsExtra<O>
{
	return options?.extraOptions ?? {} as IOptionsExtra<O>;
}
