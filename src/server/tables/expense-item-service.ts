import Model = SplitTheBill.Model;
import * as uuid from 'node-uuid';
import * as tables from './tables';
import TableService from './table-service';

export default class ExpenseItemService {
	private tableService = new TableService();

	public insertExpenseItem(item: Model.ExpenseItem): Promise<Model.ExpenseItem> {
		item.RowKey = uuid.v4();
		return this.tableService.insertEntity(this.convertModelExpenseItemToRow(item), tables.Name.EXPENSE_ITEM);
	}

	public insertExpenseItemList(items: Model.ExpenseItem[]) {
		var rowItems = items.map(item => this.convertModelExpenseItemToRow(item));
		return this.tableService.insertEntities(rowItems, tables.Name.EXPENSE_ITEM);
	}

	private convertModelExpenseItemToRow(item: Model.ExpenseItem): tables.ExpenseItem {
		var row = new tables.ExpenseItem();

		row.RowKey = item.RowKey;
		row.PartitionKey = item.PartitionKey;

		row.amount = item.amount;
		row['amount@odata.type'] = tables.ODataType.Int64;

		row.expenseId = item.expenseId;
		row['expense@odata.type'] = tables.ODataType.String;

		return row;
	}
}
