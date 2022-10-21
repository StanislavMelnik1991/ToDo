import * as http from 'http';
import path from 'path';
import cors from 'cors';
import express from 'express';
import { stdout } from 'process';
import { SocketServer } from './socketServer';
import { router } from './router';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

const server = http.createServer(app).listen(process.env.WS_PORT, () => stdout.write(`WS server started on port ${process.env.WS_PORT}`));

// eslint-disable-next-line no-new
new SocketServer(server);
