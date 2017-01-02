import * as Model from '../../shared/split-the-bill';
import * as uuid from 'node-uuid';
import * as Table from './table';
import * as tables from './tables';
import { AbstractEntityService } from './abstract-entity-service';

export default class ExpenseItemService extends AbstractEntityService<tables.ExpenseItem> {
	tableName = Table.EXPENSE_ITEM;

	public async insert(item: Model.ExpenseItem): Promise<Model.ExpenseItem> {
		item.RowKey = uuid.v4();
		return this.tableService.insertEntity(this.convertModelExpenseItemToRow(item), Table.EXPENSE_ITEM);
	}

	public async insertExpenseItemList(items: Model.ExpenseItem[]) {
		var rowItems = items.map(item => this.convertModelExpenseItemToRow(item));
		return this.tableService.insertEntities(rowItems, Table.EXPENSE_ITEM);
	}

	private convertModelExpenseItemToRow(item: Model.ExpenseItem): tables.ExpenseItem {
		var row = new tables.ExpenseItem();

		row.RowKey = item.RowKey;
		row.PartitionKey = item.PartitionKey;
		row.amount = item.amount;
		row.expenseRowKey = item.expenseRowKey;

		return row;
	}
}
