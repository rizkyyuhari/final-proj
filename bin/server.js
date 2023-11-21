"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _http = _interopRequireDefault(require("http"));
var _terminus = require("@godaddy/terminus");
var _app = _interopRequireDefault(require("./app"));
var _database = _interopRequireDefault(require("./configs/database"));
/* eslint-disable no-console */

var server = _http["default"].createServer(_app["default"]);
function onSignal() {
  console.log('server is starting cleanup');
}
var onHealthCheck = function onHealthCheck() {
  return Promise.resolve('UP');
};
(0, _terminus.createTerminus)(server, {
  signal: 'SIGINT',
  healthChecks: {
    '/healthcheck': onHealthCheck
  },
  onSignal: onSignal
});
(0, _database["default"])();
server.listen(process.env.PORT, console.log('server is running on port', process.env.PORT));