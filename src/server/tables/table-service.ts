import * as azure from 'azure';
import * as Table from './table';

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
		this.storageClient.createTableIfNotExists(Table.USER, createTableCallback);
		this.storageClient.createTableIfNotExists(Table.EXPENSE, createTableCallback);
		this.storageClient.createTableIfNotExists(Table.EXPENSE_ITEM, createTableCallback);
		this.storageClient.createTableIfNotExists(Table.GROUP, createTableCallback);
	}

	public async insertEntity<E extends azure.Entity>(entity: E, tableName: Table.Name): Promise<E> {
		return this.callEntityOperation<E>(this.storageClient.insertEntity, tableName, entity);
	}

	public pointQueryEntity<E extends azure.Entity>(partitionKey: string, rowKey: string, tableName: string): Promise<E>{
		return new Promise<E>((resolve, reject) => this.storageClient.queryEntity(tableName, partitionKey, rowKey, this.getThenableStorageCallback(resolve, reject)));
	}

	public async insertEntities<E extends azure.Entity>(entities: E[], tableName: Table.Name): Promise<E[]> {
		return Promise.all<E>(entities.map(entity => this.insertEntity(entity, tableName)));
	}

	public getAll<E extends azure.Entity>(tableName: Table.Name): Promise<E[]> {
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

	public delete<E extends azure.Entity>(tableName: Table.Name, entity: E): Promise<boolean> {
		return new Promise((resolve, reject) =>
			this.storageClient.deleteEntity(tableName, entity, (err, successful) =>
				err ? reject(err) : resolve(successful)));
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

	private async callEntityOperation<E>(operation: EntityOperationCall<E>, tableName: Table.Name, entity: E): Promise<E> {
		return new Promise<E>((resolve, reject) => operation(tableName, entity, this.getThenableStorageCallback(resolve, reject)));
	}
}

interface FeathersParams {
	query: any;
	data: any;
	result: any;
}

interface FeathersPage<Resource> {
		total: number;
		limit: number;
		skip: number;
		data: Resource[];
}

interface FeathersService<Resource> {
	find?(params: FeathersParams): Promise<FeathersPage<Resource>>;
	get(id: string, params: FeathersParams): Promise<Resource>;
	create(data: Resource, params: FeathersParams): Promise<Resource>;
  update?(id: string, data: Resource, params: FeathersParams): Promise<Resource>;
  patch?(id: string, data: Resource, params: FeathersParams): Promise<Resource>;
  remove(id: string, params: FeathersParams): Promise<Resource>;
	setup?(app: any, path?: string): any;
}

export class FeathersTableService<E extends azure.Entity> implements FeathersService<E> {
	tableServise: TableService = new TableService();
	constructor(public tableName: Table.Name) { }

	get = (id: string, params: any) => this.tableServise.pointQueryEntity(params.partitionKey, id, this.tableName);
	create = (data: E, params: any) => this.tableServise.insertEntity(data, this.tableName);
	async remove(id: string, params: any) {
		const entity = await this.tableServise.pointQueryEntity(params.partitionKey, id, this.tableName);
		await this.tableServise.delete(this.tableName, entity);
		return entity;
	}
}

