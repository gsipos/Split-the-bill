import * as Model from '../../shared/split-the-bill';

import { odataString, odataInt64, odataDateTime } from './odata-decorators';

export class Name {
	public static USER = "User";
	public static EXPENSE = "Expense";
	public static EXPENSE_ITEM = "ExpenseItem";
	public static GROUP: 'Group' = "Group";
}

export abstract class Entity implements Model.Entity<string, string>{
	public RowKey: string; //TODO
	public PartitionKey: string; //TODO
	public Timestamp: Date;
	public etag: string;
	[property: string]: string | number | boolean | Date;
}

export class Key {
	private r: string;
	private p: string;

	constructor(rowKey: string, partitionKey: string) {
		this.r = rowKey;
		this.p = partitionKey;
	}

	public get RowKey() { return this.r; }
	public set RowKey(rowKey: string) { this.r = rowKey; }

	public get PartitionKey() { return this.p };
	public set PartitionKey(partitionKey: string) { this.p = partitionKey; }

	public static from(entity: Entity): Key {
		return new Key(entity.RowKey, entity.PartitionKey);
	}
}

export class User extends Entity implements Model.User {
	@odataString
	public name: string;

	@odataString
	public email: string;

	@odataString
	public profilePicture: string;

	@odataString
	public groupKeys: string;

}

export class Expense extends Entity implements Model.Expense {
	@odataString
	public totalAmount: number;

	@odataDateTime
	public spentAt: Date;

	@odataString
	public description: string;

	@odataString
	public tags: string;
}

export class ExpenseItem extends Entity implements Model.ExpenseItem {
	@odataInt64
	public amount: number;

	@odataString
	public expenseRowKey: string;

	@odataString
	public expensePartitionKey: string;
}

export class Group extends Entity implements Model.Group {
	@odataString
	public name: string;

	@odataString
	public memberKeys: string;
}

export namespace Internal {
	export class AuditLog extends Entity {
		@odataString
		public message: string;
	}
}
