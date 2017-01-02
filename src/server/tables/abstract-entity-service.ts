import * as Table from './table';
import * as tables from './tables';
import TableService from './table-service';
import * as uuid from 'node-uuid';

export abstract class AbstractEntityService<Entity extends tables.Entity> {
	protected tableService = new TableService();
	protected tableName: Table.Name;

	public async point(rowKey: string, partitionKey: string): Promise<Entity> {
		return this.tableService.pointQueryEntity<Entity>(partitionKey, rowKey, this.tableName);
	}

	public async pointKey(key: tables.Key): Promise<Entity> {
		return this.point(key.RowKey, key.PartitionKey);
	}

	public async getAll(): Promise<Entity[]> {
		return this.tableService.getAll<Entity>(this.tableName);
	}

	public async insert(item: Entity): Promise<Entity> {
		item.RowKey = this.createId(item);
		return this.tableService.insertEntity(item, Table.EXPENSE_ITEM);
	}

	public async delete(item: Entity): Promise<boolean> {
		return this.tableService.delete(this.tableName, item);
	}

	protected createId(item: Entity): string {
		return uuid.v4();
	}
}


