import fs from 'fs';
import express from 'express';
import CryptoJS from 'crypto-js';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { storage } from './Storage.js';
import User from '../client/utility/models/User.js';
import Node from '../client/utility/models/Node.js';

import { staticUsers, staticNodes } from '../../config.js';

const passphrase = 'NEP10nG52XK29ZcgZeo*50oZL18Y1!yqx15bqO2i5Dn&Ldqinq';

const createStaticData = async () => {
	const userStorage = storage('users');
	const users = await userStorage.keys();
	for (const key of users) await userStorage.delete(key);
	for (const user of staticUsers.map((user) => User(user))) await userStorage.set(user.id, user);

	const nodeStorage = storage('nodes');
	const nodes = await nodeStorage.keys();
	for (const key of nodes) await nodeStorage.delete(key);
	for (const node of staticNodes.map((node) => Node(node))) await nodeStorage.set(node.id, node);

	return await userStorage.keys();
};

const whoAreYou = async (request) => {
	if (request.headers.authorization) {
		const token = CryptoJS.AES.decrypt(request.headers.authorization, passphrase).toString(CryptoJS.enc.Utf8);
		const id = token.slice(0, token.indexOf('/'));
		const user = await storage('users').get(id);
		if (user) return user;
	}
};

export const createRouter = async (production = false) => {
	const router = express.Router();
	router.use(express.json({ limit: '250mb' }));

	router.post('/api/login', async (request, response) => {
		try {
			const userStorage = storage('users');
			let users = await userStorage.keys();
			if (users.length !== 3) users = await createStaticData();

			for (const key of users) {
				const user = await userStorage.get(key);
				if (request.body.username === user.username && request.body.password === user.password) {
					user.token = CryptoJS.AES.encrypt(`${user.id}/${uuid()}${uuid()}${uuid()}`, passphrase).toString();
					await userStorage.set(user.id, user);
					const userData = JSON.parse(JSON.stringify(user));
					delete userData.password;
					return response.status(200).json(userData).end();
				}
			}
			return response.status(401).end();
		} catch (error) {
			console.error(error);
			return response.status(500).json(error).end();
		}
	});

	router.post('/api/logout', async (request, response) => {
		try {
			const user = await whoAreYou(request);
			if (user) {
				user.token = undefined;
				await storage('users').set(user.id, user);
			}
			return response.status(200).end();
		} catch (error) {
			console.error(error);
			return response.status(500).json(error).end();
		}
	});

	router.get('/api/whoami', async (request, response) => {
		try {
			const user = await whoAreYou(request);
			if (user) {
				delete user.password;
				return response.status(200).json(user).end();
			} else return response.status(401).end();
		} catch (error) {
			console.error(error);
			return response.status(500).json(error).end();
		}
	});

	if (production) {
		const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
		router.use(express.static(join(root, 'dist')));
		const index = fs.readFileSync(join(root, 'dist', 'index.html'), 'utf8');
		router.use('*', (request, response) => response.send(index));
	}
	return router;
};
