import * as Model from '../../shared/split-the-bill';
import * as uuid from 'node-uuid';
import * as Table from './table';
import * as tables from './tables';
import { AbstractEntityService } from './abstract-entity-service';

export default class ExpenseService extends AbstractEntityService<tables.Expense>{
	tableName = Table.EXPENSE;

	public insert(expense: Model.Expense) {
		expense.RowKey = uuid.v4();
		return this.tableService.insertEntity(this.convertModelExpenseToRow(expense), Table.EXPENSE);
	}

	private convertModelExpenseToRow(expense: Model.Expense): tables.Expense {
		var row = new tables.Expense();

		row.RowKey = expense.RowKey;
		row.PartitionKey = expense.PartitionKey;
		row.totalAmount = expense.totalAmount;
		row.spentAt = expense.spentAt;
		row.description = expense.description;

		return row;
	}
}
