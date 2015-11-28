/// <reference path="../references.ts" />

import * as azure from 'azure';

var createTableCallback: azure.CreateTableIfNotExistsCallback = (error, result, response) => {
	if (error) {
		throw error;
	}
};

interface EntityOperationCallback<R> {
	(error: Error, result: R, response: azure.WebResponse): void;
}

interface EntityOperationCall<R> {
	(tableName: string, entity: R, callback: EntityOperationCallback<R>): void;
}

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
	
	public insertEntity<E extends azure.Entity>(entity: E, tableName: string): Promise<E> {
		return this.callEntityOperation(this.storageClient.insertEntity, tableName, entity);
	}
	
	public insertEntities<E extends azure.Entity>(entities: E[], tableName: string): Promise<E[]> {		
		return Promise.all<E>(entities.map(entity => this.insertEntity(entity, tableName)));
	}
	
	private getThenableStorageCallback<R>(resolve: Function, reject: Function): EntityOperationCallback<R> {
		return (error: Error, result: R, response: azure.WebResponse) => { 
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		};
	}
	
	private callEntityOperation<E>(operation: EntityOperationCall<E>, tableName: string, entity: E): Promise<E> {
		return new Promise((resolve, reject) => operation(tableName, entity, this.getThenableStorageCallback(resolve, reject)));
	}
}
