/* eslint-disable no-console */
import http from 'http';
import { createTerminus } from '@godaddy/terminus';
import app from './app';
import database from './configs/database';

const server = http.createServer(app);

function onSignal() {
  console.log('server is starting cleanup');
}

const onHealthCheck = () => Promise.resolve('UP');

createTerminus(server, {
  signal: 'SIGINT',
  healthChecks: { '/healthcheck': onHealthCheck },
  onSignal
});

database();

server.listen(process.env.PORT, console.log('server is running on port', process.env.PORT));
