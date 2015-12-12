/// <reference path="../references.ts" />
"use strict";
import Model = SplitTheBill.Model;

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
		row['totalAmount@odata.type'] = tables.ODataType.Int64;

		row.spentAt = expense.spentAt;
		row['spentAt@odata.type'] = tables.ODataType.DateTime;

		row.description = expense.description;
		row['description@odata.tye'] = tables.ODataType.String;
		
		row.category = expense.category;
		row['category@odata.type'] = tables.ODataType.String;
		
		return row;
	}
}
