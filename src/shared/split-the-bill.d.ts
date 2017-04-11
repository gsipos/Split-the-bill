
interface Entity<RowKey extends string, PartitionKey extends string> {
	PartitionKey: PartitionKey;
	RowKey: RowKey;
	Timestamp: Date;
	etag: string;
}

interface Database {
	user: { [userKey: string]: User; },
	group: { [groupKey: string]: Group; }
}

interface User {
	name: string;
	email: string;
	profilePicture: string;
	groupKeys: string[];
}

interface Expense {
	userId: string;
	groupId: string;
	totalAmount: number;
	spentAt: Date;
	description: string;
}

interface ExpenseItem {
	amount: number;
	expenseRowKey: string;
	expensePartitionKey: string;
}

interface Group {
	name: string;
	memberKeys: string;
	owners: string[];
}

