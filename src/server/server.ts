/// <reference path="references.ts" />

import * as express from 'express';

namespace SplitTheBill.Server {
	
	
	var app = express();
	Server.StartUp.setUpTables();
	
}