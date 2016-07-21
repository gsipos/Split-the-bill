import * as Model from '../../shared/split-the-bill';

import * as uuid from 'node-uuid';
import * as tables from './tables';
import TableService from './table-service';

export default class ExpenseService {
	private tableService = new TableService();

	public insert(expense: Model.Expense) {
		expense.RowKey = uuid.v4();
		return this.tableService.insertEntity(this.convertModelExpenseToRow(expense), tables.Name.EXPENSE);
	}

	private convertModelExpenseToRow(expense: Model.Expense): tables.Expense {
		var row = new tables.Expense();

		row.RowKey = expense.RowKey;
		row.PartitionKey = expense.PartitionKey;
		row.totalAmount = expense.totalAmount;
		row.spentAt = expense.spentAt;
		row.description = expense.description;
		row.category = expense.category;

		return row;
	}
}
