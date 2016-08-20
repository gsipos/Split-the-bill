import * as azure from 'azure';
import * as tables from './tables';
import Environment from '../environment';

var createTableCallback: azure.CreateTableIfNotExistsCallback = (error) => {
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
	public storageClient: azure.TableService;

	constructor() {
		var retryOperations = new azure.ExponentialRetryPolicyFilter();
		this.storageClient = <azure.TableService>azure.createTableService(Environment.accountName, Environment.accountKey).withFilter(retryOperations);
	}

	public initializeTables(): void {
		this.storageClient.createTableIfNotExists(tables.Name.USER, createTableCallback);
		this.storageClient.createTableIfNotExists(tables.Name.EXPENSE, createTableCallback);
		this.storageClient.createTableIfNotExists(tables.Name.EXPENSE_ITEM, createTableCallback);
		this.storageClient.createTableIfNotExists(tables.Name.GROUP, createTableCallback);
	}

	public insertEntity<E extends azure.Entity>(entity: E, tableName: string): Promise<E> {
		return this.callEntityOperation<E>(this.storageClient.insertEntity, tableName, entity);
	}

	public pointQueryEntity<E extends azure.Entity>(partitionKey: string, rowKey: string, tableName: string): Promise<E>{
		return new Promise<E>((resolve, reject) => this.storageClient.queryEntity(tableName, partitionKey, rowKey, this.getThenableStorageCallback(resolve, reject)));
	}

	public insertEntities<E extends azure.Entity>(entities: E[], tableName: string): Promise<E[]> {
		return Promise.all<E>(entities.map(entity => this.insertEntity(entity, tableName)));
	}

	public getAll<E extends azure.Entity>(tableName: string): Promise<E[]> {
		var query = new azure.TableQuery()
			.from(tableName);

		return new Promise((resolve, reject) => this.storageClient.queryEntities(query, (error, entities) => {
			if (error) {
				reject(error);
			} else {
				resolve(entities);
			}
		}));
	}

	private getThenableStorageCallback<R>(resolve: Function, reject: Function): EntityOperationCallback<R> {
		return (error: Error, result: R) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		};
	}

	private callEntityOperation<E>(operation: EntityOperationCall<E>, tableName: string, entity: E): Promise<E> {
		return new Promise<E>((resolve, reject) => operation(tableName, entity, this.getThenableStorageCallback(resolve, reject)));
	}
}
