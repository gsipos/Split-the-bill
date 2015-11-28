/// <reference path="references.ts" />

import * as express from 'express';
import * as startup from  './startup/startup';
import * as userApi from './api/user-api';

namespace SplitTheBill.Server {
	
	var app = express();
	startup.setUpTables();
	
	app.use(express.static('client'));
	app.use(userApi.api);
}
