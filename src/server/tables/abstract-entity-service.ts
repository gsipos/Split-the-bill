import * as Table from './table';
import * as tables from './tables';
import TableService from './table-service';
import * as uuid from 'node-uuid';

export abstract class AbstractEntityService<Entity extends tables.Entity> {
	protected tableService = new TableService();
	protected tableName: Table.Name;

	public point(rowKey: string, partitionKey: string): Promise<Entity> {
		return this.tableService.pointQueryEntity<Entity>(partitionKey, rowKey, this.tableName);
	}

	public pointKey(key: tables.Key): Promise<Entity> {
		return this.point(key.RowKey, key.PartitionKey);
	}

	public getAll(): Promise<Entity> {
		return this.tableService.getAll(this.tableName);
	}

	public insert(item: Entity): Promise<Entity> {
		item.RowKey = uuid.v4();
		return this.tableService.insertEntity(item, Table.EXPENSE_ITEM);
	}
}


