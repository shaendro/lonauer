import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';

import Subdomain from './Subdomain.js';
import { createRouter as Template } from '../template/src/server/Routes.js';

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

	const app = express();
	app.use('/', await Template(true));

	// app.use(portfolio);
	// app.use(Subdomain('oleander', oleander));
	// app.use(Subdomain('herbarium', herbarium));
	// app.use(Subdomain('outschedule', outschedule));
	// app.use(Subdomain('retrospective', retrospective));

	if (privateKey && certificate) {
		const credentials = { key: privateKey, cert: certificate };
		http.createServer((request, response) => response.writeHead(301, { Location: `https://${request.headers['host']}${request.url}` }).end()).listen(httpPort);
		https.createServer(credentials, app).listen(httpsPort);
		console.info(`Server is listening on https://lonauer.com/`);
	} else {
		http.createServer({}, app).listen(httpPort);
		console.info(`Server is listening on http://localhost:${httpPort}`);
	}
};

createServer();
