import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';

import { createRouter as Teachest } from './teachest/src/server/Routes.js';
import { createRouter as Portfolio } from './portfolio/src/server/Routes.js';

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
	app.use(createSubdomain('teachest', await Teachest(true)));
	app.use('/', await Portfolio(true));

	// app.use(createSubdomain('oleander', oleander));
	// app.use(createSubdomain('herbarium', herbarium));
	// app.use(createSubdomain('retrospective', retrospective));

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

const createSubdomain = (subdomain, handler) => {
	return (request, response, next) => {
    request._subdomainLevel = request._subdomainLevel ?? 0;
		const subdomains = subdomain.split('.').reverse();
		for (let i = 0; i < subdomains.length; i++) {
			const expected = subdomains[i];
      if (expected === '*') continue;
			const actual = request.subdomains[i + request._subdomainLevel];
			if (actual !== expected) return next();
		}
		request._subdomainLevel++;
		return handler(request, response, next);
	};
};

createServer();
