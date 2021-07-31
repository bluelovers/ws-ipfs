import { IParsePathResult, IParsePathResultStrict } from './types';

export function _isStringObject(input): input is string
{
	return (input instanceof String || Object.prototype.toString.call(input) === '[object String]')
}

export function _isEmptyPath(path: string)
{
	return (!path?.length || path === '/' || path === '')
}

export function _invalidPath(path: string)
{
	return (path?.length && path[0] !== '/' || typeof path !== 'string' && _isDefined(path))
}

export function _isDefined<T>(path: T): path is NonNullable<T>
{
	return typeof path !== 'undefined' && path !== null
}

export function _parsedPathIsCid(input: IParsePathResultStrict)
{
	return isParsePathResultLoose(input) && _isEmptyPath(input.path)
}

export function _parsedPathIsPath(input: IParsePathResultStrict)
{
	return isParsePathResultLoose(input) && !_isEmptyPath(input.path)
}

export function isParsePathResultLoose(result: IParsePathResult | any): result is IParsePathResult
{
	// @ts-ignore
	return Boolean(result.ns && result.hash)
}

