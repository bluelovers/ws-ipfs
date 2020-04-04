/**
 * Created by user on 2020/4/4.
 */

export type IPort = number | string;
export type IType = 'js' | 'go';

export function getDefaultAddressesPorts(ports?: {
	Swarm?: IPort,
	API?: IPort,
	Gateway?: IPort,
}, type: IType | string = 'js')
{
	let config: {
		Swarm: IPort,
		API: IPort,
		Gateway: IPort,
	};

	if (type === 'go')
	{
		config = {
			Swarm: ports?.Swarm || 4001,
			API: ports?.API || 5001,
			Gateway: ports?.Gateway || 8080,
		}
	}
	else
	{
		const s: number = ports?.Swarm as number || 4002;

		config = {
			Swarm: s,
			API: ports?.API || 5002,
			Gateway: ports?.Gateway || 9090,
		}
	}

	return config
}

export function createDefaultAddresses(ports?: {
	Swarm?: IPort,
	API?: IPort,
	Gateway?: IPort,
}, type: IType | string = 'js')
{
	ports = getDefaultAddressesPorts(ports, type);

	let config: {
		Swarm: string[],
		API: string,
		Gateway: string,
	};

	if (type === 'go')
	{
		config = {
			Swarm: [
				`/ip4/0.0.0.0/tcp/${ports.Swarm}`,
				`/ip6/::/tcp/${ports.Swarm}`,
			],
			API: `/ip4/127.0.0.1/tcp/${ports.API}`,
			Gateway: `/ip4/127.0.0.1/tcp/${ports.Gateway}`,
		}
	}
	else
	{
		let s: number = ports.Swarm as number;

		config = {
			Swarm: [
				`/ip4/0.0.0.0/tcp/${s}`,
				`/ip4/127.0.0.1/tcp/${s + 1}/ws`,
			],
			API: `/ip4/127.0.0.1/tcp/${ports.API}`,
			Gateway: `/ip4/127.0.0.1/tcp/${ports.Gateway}`,
		}
	}

	return config
}

export default createDefaultAddresses
