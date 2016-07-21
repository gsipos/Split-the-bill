
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

type ExpenseCategoryId = string;
interface ExpenseCategory extends Entity<ExpenseCategoryId, string> {
	name: string;
	icon: string;
	description: string;
}

type ExpenseId = string;
interface Expense extends Entity<ExpenseId, UserId> {
	totalAmount: number;
	spentAt: Date;
	description: string;
	category: ExpenseCategoryId;
}

interface ExpenseItem extends Entity<string, UserId> {
	amount: number;
	expenseId: string;
}

export namespace Api {
		interface SaveExpense {
		userId: UserId;
		expense: Expense;
		items: ExpenseItem[];
		}
}
