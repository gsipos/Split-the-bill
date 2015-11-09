/// <reference path="references.ts" />

namespace SplitTheBill.Model {

	export interface ExpenseItem {
		name?: string;
		amount: number;
	}
	
	export type UserId = string;
	export interface User extends IdentifiedEntity<UserId> {
		name: string;
		profilePicture: string;
		balance: number;
	}
	
	export type UserTransactionId = string;
	export interface UserTransaction extends Entity<UserTransactionId, UserId> {
		amount: number;
		expenseId: ExpenseId;
	}
	
	export type ExpenseCategoryId = string;
	export interface ExpenseCategory extends IdentifiedEntity<ExpenseCategoryId> {
		icon: string;
		name: string;
		description: string;
	}
	
	export type ExpenseId = string;
	export interface Expense extends IdentifiedEntity<ExpenseId> {
		totalAmount: number;
		items: ExpenseItem[];
		
		spentAt: Date;
		description: string;
		category: ExpenseCategoryId;
		tags: string[];
	}
}