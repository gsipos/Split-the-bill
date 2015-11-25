/// <reference path="../../typings/tsd.d.ts" />
import azure = require('azure');

declare namespace SplitTheBill {

	namespace Model {

		interface Entity<I extends string, P extends string> extends azure.Entity{
			RowKey: I;
			PartitionKey: P;
			TimeStamp: Date;
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

		interface ExpenseItem extends Entity<UserId, ExpenseId> {
			amount: number;
			expenseId: string;
		}
	}
	
	namespace Api {
		interface SaveExpense {
			userId: Model.UserId;
			expense: Model.Expense;
			items: Model.ExpenseItem[];
		}
	}

}