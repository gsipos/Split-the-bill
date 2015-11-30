/// <reference path="references.ts" />
"use strict";

import * as http from 'http';
import * as express from 'express';
import * as startup from  './startup/startup';
import * as userApi from './api/user-api';

console.info('STB starting...');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.static('client'));
app.get('/omfg', (req: any, res: any) => res.send('Lol it works! :)'));

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

console.info('Modules loaded');
startup.setUpTables();
app.use(userApi.api);


console.info('STB end :(');
