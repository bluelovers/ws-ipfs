import { _isStringObject } from './util';

export function _invalidInput(input: unknown)
{
	let type = typeof input;
	return !_isStringObject(type) && type !== 'function' && type !== 'object' || !Boolean(input)
}
