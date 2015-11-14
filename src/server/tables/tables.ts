
/// <reference path="../references.ts" />
namespace SplitTheBill.Server.Tables {
	export abstract class Entity implements Model.Entity<string, string>{
		public RowKey: string; //TODO
		public PartitionKey: string; //TODO
		public TimeStamp: Date; 
	}
	
	export class User extends Entity implements Model.User {
		public name: string;
		private 'name@odata.type': string = ODataType.String;
		
		public profilePicture: string;
		private 'profilePicture@odata.type': string = ODataType.String;
		
		public balance: number;
		private 'balance@odata.type': string = ODataType.Int64;
	}
	
	export class UserTransaction extends Entity implements Model.UserTransaction {
		public amount: number;
		private 'amount@odata.type' = ODataType.Int64;
		
		public expenseId: Model.ExpenseId;
		private 'expenseId@odata.type' = ODataType.String;
	}
	
	export class ExpenseCategory extends Entity implements Model.ExpenseCategory {
		public icon: string;
		private 'icon@odata.type' = ODataType.String;
		
		public name: string;
		private 'name@odata.type' = ODataType.String;
		
		public description: string;
		private 'descripttion@odata.type' = ODataType.String;
	}
	
	export class Expense extends Entity implements Model.Expense {
		public totalAmount: number;
		private 'totalAmount@odata.type': string = ODataType.Int64;
		
		public itemsString: string;
		private 'itemsString@odata.type': string = ODataType.String;
		
		public spentAt: Date;
		private 'spentAt@odata.type': string = ODataType.DateTime;
		
		public description: string;
		private 'description@odata.tye': string = ODataType.String;
		
		public category: string;
		private 'category@odata.type': string = ODataType.String;
		
		private tagsString: string;
		private 'tagsString@odata.type': string = ODataType.String;
		
		public get items(): Model.ExpenseItem[] { return JSON.parse(this.itemsString); }
		public set items(newItems: Model.ExpenseItem[]) { this.itemsString = JSON.stringify(newItems) }
		
		public get tags() { return this.tagsString.split(','); }
		public set tags(newTags: string[]) { this.tagsString = newTags.join(',')}
	}
}