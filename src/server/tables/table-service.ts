/// <reference path="../references.ts" />

import * as azure from 'azure';
import * as tables from './tables';
import Environment from '../environment';

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
	private env = new Environment();

	public storageClient: azure.TableService;

	constructor() {
		var retryOperations = new azure.ExponentialRetryPolicyFilter();
		this.storageClient = <azure.TableService>azure.createTableService(this.env.accountName, this.env.accountKey).withFilter(retryOperations);
	}

	public initializeTables(): void {
		this.storageClient.createTableIfNotExists(tables.Name.USER, createTableCallback);
		this.storageClient.createTableIfNotExists(tables.Name.EXPENSE_CATEGORY, createTableCallback);
		this.storageClient.createTableIfNotExists(tables.Name.EXPENSE, createTableCallback);
		this.storageClient.createTableIfNotExists(tables.Name.EXPENSE_ITEM, createTableCallback);
	}
	
	public insertEntity<E extends azure.Entity>(entity: E, tableName: string): Promise<E> {
		return this.callEntityOperation(this.storageClient.insertEntity, tableName, entity);
	}
	
	public pointQueryEntity<E extends azure.Entity>(partitionKey: string, rowKey: string, tableName: string): Promise<E>{
		return new Promise((resolve, reject) => this.storageClient.queryEntity(tableName, partitionKey, rowKey, this.getThenableStorageCallback(resolve, reject)));
	}
	
	public insertEntities<E extends azure.Entity>(entities: E[], tableName: string): Promise<E[]> {		
		return Promise.all<E>(entities.map(entity => this.insertEntity(entity, tableName)));
	}
	
	public getAll<E extends azure.Entity>(tableName: string): Promise<E[]> {
		var query = azure.TableQuery.select('*').from(tableName);
		return new Promise((resolve, reject) => this.storageClient.queryEntities(query, (error, entities, token, webresponse) => { 
			if (error) {
				reject(error);
			} else {
				resolve(entities);
			}
		}));
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
