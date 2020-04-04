/**
 * Created by user on 2020/4/4.
 */

export type IPort = number | string;
export type IType = 'js' | 'go';

export function getDefaultAddressesPorts(ports?: {
	Swarm?: IPort,
	Swarm2?: IPort,
	API?: IPort,
	Gateway?: IPort,
}, type: IType | string = 'js')
{
	let config: {
		Swarm: number,
		Swarm2?: number,
		API: number,
		Gateway: number,
	};

	if (type === 'go')
	{
		config = {
			Swarm: ports?.Swarm as number | 0 || 4001,
			Swarm2: ports?.Swarm2 as number | 0 || 4001,
			API: ports?.API as number | 0 || 5001,
			Gateway: ports?.Gateway as number | 0 || 8080,
		}
	}
	else
	{
		const Swarm: number = ports?.Swarm as number | 0 || 4002;
		const Swarm2: number = ports?.Swarm2 as number | 0 || Swarm + 1;

		config = {
			Swarm,
			Swarm2,
			API: ports?.API as number | 0 || 5002,
			Gateway: ports?.Gateway as number | 0 || 9090,
		}
	}

	return config
}

export function createDefaultAddresses(ports?: {
	Swarm?: IPort,
	Swarm2?: IPort,
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
				`/ip6/::/tcp/${ports.Swarm2}`,
			],
			API: `/ip4/127.0.0.1/tcp/${ports.API}`,
			Gateway: `/ip4/127.0.0.1/tcp/${ports.Gateway}`,
		}
	}
	else
	{
		config = {
			Swarm: [
				`/ip4/0.0.0.0/tcp/${ports.Swarm}`,
				`/ip4/127.0.0.1/tcp/${ports.Swarm2}/ws`,
			],
			API: `/ip4/127.0.0.1/tcp/${ports.API}`,
			Gateway: `/ip4/127.0.0.1/tcp/${ports.Gateway}`,
		}
	}

	return config
}

export default createDefaultAddresses
