
/// <reference path="../references.ts" />
import Model = SplitTheBill.Model;

import * as azure from 'azure';

export abstract class ODataType {
	public static ByteArray: string = "Edm.Binary";
	public static Boolean: string = "Edm.Boolean";
	public static DateTime: string = "Edm.DateTime";
	public static Double: string = "Edm.Double";
	public static Guid: string = "Edm.Guid";
	public static Int32: string = "Edm.Int32";
	public static Int64: string = "Edm.Int64";
	public static String: string = "Edm.String";
}

export class Name {
	public static USER = "User";
	public static EXPENSE = "Expense";
    public static EXPENSE_ITEM = "ExpenseItem";
    public static EXPENSE_CATEGORY = "ExpenseCategory";
}

export abstract class Entity implements Model.Entity<string, string>{
	public RowKey: string; //TODO
	public PartitionKey: string; //TODO
	public TimeStamp: Date;
	public etag: string;
	[property: string]: string | number | boolean | Date;
}

export class User extends Entity implements Model.User {
	public name: string;
	public profilePicture: string;
}

export class ExpenseCategory extends Entity implements Model.ExpenseCategory {
	public icon: string;
	public name: string;
	public description: string;
}

export class ExpenseCategoryWithOdata extends ExpenseCategory {
	private 'icon@odata.type' = ODataType.String;
	private 'name@odata.type' = ODataType.String;
	private 'descripttion@odata.type' = ODataType.String;
}

export class Expense extends Entity implements Model.Expense {
	public totalAmount: number;
	public spentAt: Date;
	public description: string;
	public category: string;
}

export class ExpenseItem extends Entity implements Model.ExpenseItem {
	public amount: number;
	public expenseId: string;
}

export namespace Internal {
    export class AuditLog extends Entity {
        public message: string;
        private 'message@odata.type' = ODataType.String;
	}
}