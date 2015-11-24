/// <reference path="references.ts" />

import * as express from 'express';
import * as startup from  './startup/startup';

namespace SplitTheBill.Server {
	
	var app = express();
	startup.setUpTables();
	
	app.use(express.static('client'));
}