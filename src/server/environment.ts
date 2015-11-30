/// <reference path="references.ts" />

export default class Environment{
	
	get accountName() { return process.env.accountName; }
	
	get accountKey() { return process.env.accountKey; }
} 