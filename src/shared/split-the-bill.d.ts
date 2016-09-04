
interface Entity<RowKey extends string, PartitionKey extends string> {
	PartitionKey: PartitionKey;
	RowKey: RowKey;
	Timestamp: Date;
	etag: string;
}

type UserId = string;
interface User extends Entity<UserId, string> {
	name: string;
	email: string;
	profilePicture: string;
	groupKeys: string;
}

type ExpenseId = string;
interface Expense extends Entity<ExpenseId, UserId> {
	totalAmount: number;
	spentAt: Date;
	description: string;
}

interface ExpenseItem extends Entity<string, UserId> {
	amount: number;
	expenseRowKey: string;
	expensePartitionKey: string;
}

type GroupId = string;
interface Group extends Entity<GroupId, string>{
	name: string;
	memberKeys: string
}

export namespace Api {
		interface SaveExpense {
		userId: UserId;
		expense: Expense;
		items: ExpenseItem[];
		}
}
