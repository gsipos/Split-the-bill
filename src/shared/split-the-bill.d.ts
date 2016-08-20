
interface Entity<I extends string, P extends string> {
	PartitionKey: P;
	RowKey: I;
	Timestamp: Date;
	etag: string;
}

type UserId = string;
interface User extends Entity<UserId, string> {
	name: string;
	profilePicture: string;
}

type ExpenseId = string;
interface Expense extends Entity<ExpenseId, UserId> {
	totalAmount: number;
	spentAt: Date;
	description: string;
}

interface ExpenseItem extends Entity<string, UserId> {
	amount: number;
	expenseId: string;
}

type GroupId = string;
interface Group extends Entity<GroupId, string>{
	name: string;
	memberIds: string
}

export namespace Api {
		interface SaveExpense {
		userId: UserId;
		expense: Expense;
		items: ExpenseItem[];
		}
}
