/// <reference path="../references.ts" />
import Model = SplitTheBill.Model;
import azure = require('azure');

import * as tables from './tables';
import TableService from './service';

export default class ExpenseItemService {
	private tableService = new TableService();
	
	
	constructor() {
		
	}
	
	public insertExpenseItem(item: Model.ExpenseItem): Promise<Model.ExpenseItem> {
		var itemWithOdata = new tables.ExpenseItemWithOdata();
		
		itemWithOdata.RowKey = item.RowKey;
		itemWithOdata.PartitionKey = item.PartitionKey;
		itemWithOdata.amount = item.amount;
		itemWithOdata.expenseId = item.expenseId;
		
		var storageClient = this.tableService.storageClient;
		
		return new Promise<Model.ExpenseItem>(( resolve, reject) => {
			storageClient.insertEntity(tables.Name.EXPENSE_ITEM, itemWithOdata, (error: Error, entity: Model.ExpenseItem, response: azure.WebResponse) => {
				if(error){
					reject(error);
				} else {
					resolve(entity);
				}
			});
		});
	}
	
	public insertExpenseItemList(items: Model.ExpenseItem[]) {
		var storageClient = this.tableService.storageClient;
		storageClient.beginBatch();
		items.forEach( item => this.insertExpenseItem(item));
		storageClient.commitBatch((error: any, operationResponses: any[], response: any) => {
			//TODO
		});
		var a = new Promise();
	}
	
	
} 