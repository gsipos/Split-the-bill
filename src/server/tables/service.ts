/// <reference path="../references.ts" />

import * as azure from 'azure';

var createTableCallback: azure.CreateTableIfNotExistsCallback = (error, result, response) => {
	if (error) {
		throw error;
	}
};

export default class TableService {
	private get accountName() { return process.env.accountName; }
	private get accountKey() { return process.env.accountKey; }

	public storageClient: azure.TableService;

	constructor() {
		var retryOperations = new azure.ExponentialRetryPolicyFilter();
		this.storageClient = <azure.TableService>azure.createTableService(this.accountName, this.accountKey).withFilter(retryOperations);
	}

	public initializeTables(): void {
		this.storageClient.createTableIfNotExists('User', createTableCallback);
		this.storageClient.createTableIfNotExists('ExpenseCategory', createTableCallback);
		this.storageClient.createTableIfNotExists('Expense', createTableCallback);
		this.storageClient.createTableIfNotExists('ExpenseItem', createTableCallback);
	}
}
