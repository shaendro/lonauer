import Redis from 'redis';

let client = undefined;

const setup = async () => {
	client = Redis.createClient();
	await client.connect();
	client.on('error', (error) => console.error('Redis:', error));
};

export const storage = (name) => {
	if (!client) setup();
	return {
		name: name,
		get: async (id) => {
			if (await client.sIsMember(name, `${name}_${id}`)) return JSON.parse(await client.get(`${name}_${id}`));
			else return null;
		},
		set: async (id, data) => {
			if ((await client.sIsMember(name, `${name}_${id}`)) || !(await client.get(`${name}_${id}`))) {
				if (data !== undefined && data !== null) {
					await client.sAdd(name, `${name}_${id}`);
					return await client.set(`${name}_${id}`, JSON.stringify(data));
				}
			} else throw `Invalid Storage ID: ${`${name}_${id}`}`;
		},
		delete: async (id) => {
			if ((await client.sIsMember(name, `${name}_${id}`)) || !(await client.get(`${name}_${id}`))) {
				await client.sRem(name, `${name}_${id}`);
				return await client.del(`${name}_${id}`);
			}
		},
		keys: async () => {
			let keys = await client.sMembers(name);
			keys = keys.map((key) => key.replace(`${name}_`, ''));
			return keys;
		},
	};
};
