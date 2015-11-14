/// <reference path="../../../typings/tsd.d.ts" />

import * as azure from 'azure';

namespace SplitTheBill.Server.StartUp {

	var createTableCallback: azure.CreateTableIfNotExistsCallback = (error, result, response) => {
		if (error) {
			throw error;
		}
	};

	export function setUpTables(): void {
		var storageClient = azure.createTableService("<accountname>", "accountkey"); //TODO;
		storageClient.createTableIfNotExists('User', createTableCallback);
		storageClient.createTableIfNotExists('UserTransaction', createTableCallback);
		storageClient.createTableIfNotExists('ExpenseCategory', createTableCallback);
		storageClient.createTableIfNotExists('Expense', createTableCallback);
	}
}