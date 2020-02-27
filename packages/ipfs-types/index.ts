/**
 * Created by user on 2020/2/27.
 */

import { ITSPickRecordType } from 'ts-type';

export type IIPFSAddressesURL = Partial<Omit<ITSPickRecordType<URL, string>, 'port'>> & {
	port?: number | string,
	protocol?: 'https' | 'http' | string,
}

export interface IIPFSAddresses
{
	"Swarm": string[],
	"API": string,
	"Gateway": string,
	"Delegates": string[]
}

