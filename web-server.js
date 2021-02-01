#!/usr/bin/env node

require('dotenv').config();

var Path = require('path');
var express = require('express');
var app = express();
var prefixConsole = require('yow/prefixConsole');

function debug() {
	console.log.apply(this, arguments);
}

debug('HEJ');

var App = function(argv) {



	function parseArgs() {

		var args = require('yargs');

		args.usage('Usage: $0 [options]');

		args.help('help').alias('help', 'h');
		args.option('port', {alias:'p', describe:'Listen to specified port', default:parseInt(process.env.WEBSERVER_PORT)});
		args.option('root', {alias:'r', describe:'Specifies root path', default:process.env.WEBSERVER_ROOT});

		args.wrap(null);

		args.check(function(argv) {
			return true;
		});

		return args.argv;
	}


	function run(argv) {

		var bodyParser = require('body-parser');

		prefixConsole();

		var path = Path.resolve(argv.root);

		debug(path);
		app.use(express.static(path));

		app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
		app.use(bodyParser.json({limit: '50mb'}));

		app.get('/', (req, res) => {
			res.send('Hello World!');
		});

		app.get('/foo', (req, res) => {
			res.send('Hello World!');
		});

		//var server = require('http').Server(app);


		app.listen(argv.port, function () {
			debug(`Listening on port ${argv.port}`);

		});



	}

	run(parseArgs());
};


new App();
