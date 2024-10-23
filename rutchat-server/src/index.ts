import express, { Express, Request, Response } from 'express';

import { Server as SocketIOSv, Socket } from 'socket.io';
import { Server } from "http";

// PRUEBA, MODIFICA TU EL PUTO BLOSTE

const app: Express = express();

const httpServer: Server = new Server(app);

const io = new SocketIOSv(httpServer);

app.use(express.json());

const port: number = 3000;

app.use(express.static('public'));



