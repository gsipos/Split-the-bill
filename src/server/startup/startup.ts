/// <reference path="../../../typings/tsd.d.ts" />
"use strict";

import * as azure from 'azure';
import * as tables from '../tables/tables';
import TableService from '../tables/table-service';

export function setUpTables(): void {
	var tableService = new TableService();
	tableService.initializeTables();
}


