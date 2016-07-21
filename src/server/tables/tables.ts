import * as Model from '../../shared/split-the-bill';

import {odataString, odataInt64, odataDateTime} from './odata-decorators';

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
	public Timestamp: Date;
	public etag: string;
	[property: string]: string | number | boolean | Date;
}

export class User extends Entity implements Model.User {
	@odataString
	public name: string;
	@odataString
	public profilePicture: string;
}

export class ExpenseCategory extends Entity implements Model.ExpenseCategory {
	@odataString
	public icon: string;
	@odataString
	public name: string;
	@odataString
	public description: string;
}

export class Expense extends Entity implements Model.Expense {
	@odataString
	public totalAmount: number;
	@odataDateTime
	public spentAt: Date;
	@odataString
	public description: string;
	@odataString
	public category: string;
}

export class ExpenseItem extends Entity implements Model.ExpenseItem {
	@odataInt64
	public amount: number;
	@odataString
	public expenseId: string;
}

export namespace Internal {
	export class AuditLog extends Entity {
				@odataString
        public message: string;
	}
}
