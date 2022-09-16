import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';
import { createServer as createViteServer } from 'vite';

import { createRouter } from './Routes.js';

const httpPort = 3000;
const httpsPort = 4000;

const createServer = async () => {
	let privateKey = undefined;
	let certificate = undefined;
	try {
		privateKey = fs.readFileSync('./privkey.pem', 'utf8');
		certificate = fs.readFileSync('./fullchain.pem', 'utf8');
	} catch (error) {
		console.error('Could not find credentials. Setting up local development...');
	}

	if (privateKey && certificate) {
		const app = express();
		app.use('/', await createRouter(true));

		const credentials = { key: privateKey, cert: certificate };
		http.createServer((request, response) => response.writeHead(301, { Location: `https://${request.headers['host']}${request.url}` }).end()).listen(httpPort);
		https.createServer(credentials, app).listen(httpsPort);
		console.info(`Server is listening on https://lonauer.com/`);
	} else {
		const app = express();
		app.use('/', await createRouter(false));
		const vite = await createViteServer({ server: { middlewareMode: 'true' } });
		app.use(vite.middlewares);

		http.createServer({}, app).listen(httpPort);
		console.info(`Server is listening on http://localhost:${httpPort}`);
	}
};

createServer();
