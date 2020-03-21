export type ICallback<T, E = Error, R = void> = (error: E, result?: T) => R;

export type IParametersWithCallbackWithMaybeArgv<T, Argv1 = any, E = Error> = [ICallback<T, E>] | [Argv1, ICallback<T, E>];

export interface IErrorLike
{
	message: any
}
