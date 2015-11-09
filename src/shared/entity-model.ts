namespace SplitTheBill.Model {
	export interface Entity<I extends string, P extends string> {
		RowKey: I;
		PartitionKey: P;
		TimeStamp: Date;
	}
	
	export type BasicEntity = Entity<string, string>;
	export type IdentifiedEntity<I extends string> = Entity<I, string>;
	
}