
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
		
		
	}
}