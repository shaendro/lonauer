import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';
import { Server } from 'socket.io';

import { handler as portfolio } from './portfolio/build/handler.js';
import { handler as oleander } from './oleander/build/handler.js';
import { handler as herbarium } from './herbarium/build/handler.js';
import { handler as outschedule } from './outschedule/build/handler.js';
import { handler as retrospective } from './retrospective/build/handler.js';

const setServer = (server) => {
	const ioServer = new Server(server);
	ioServer.of(/^\/notification-.+$/).on('connection', (listener) => {
		listener.onAny((eventName, data) => {
			ioServer.of(listener.nsp.name).emit(eventName, data);
		});
	});
	ioServer.of(/^\/simulation-.+$/).on('connection', (listener) => {
		listener.onAny((eventName, data) => {
			ioServer.of(listener.nsp.name).emit(eventName, data);
		});
	});
};

const certificate = fs.readFileSync('/etc/letsencrypt/live/lonauer.com/fullchain.pem', 'utf8');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/lonauer.com/privkey.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
app.use('/oleander', oleander);
app.use('/herbarium', herbarium);
app.use('/outschedule', outschedule);
app.use('/retrospective', retrospective);
app.use(portfolio);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
setServer(httpServer);
setServer(httpsServer);
httpServer.listen(80, () => console.info(`Server is listening on http://localhost:${80}`));
httpsServer.listen(443, () => console.info(`Server is listening on https://localhost:${443}`));
