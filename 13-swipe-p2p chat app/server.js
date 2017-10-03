"use strict";

process.on('uncaughtException', function (error) {
	console.log(error.stack);
});

//childProcess.exec('aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all');
var b = require("budo");

b('./index.js', {
	live: false,
	port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
	host: process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
	serve: 'bundle.js'
}).on('connect', function (ev) {
	console.log('Server running on %s', ev.uri);
	console.log('LiveReload running on port %s', ev.livePort);
}).on('update', function (buffer) {
	console.log('bundle - %d bytes', buffer.length);
});
