
export interface Entity<I extends string, P extends string> {
    PartitionKey: P;
    RowKey: I;
    Timestamp?: Date;
    etag?: string;
    [property: string]: string | number | boolean | Date | I | P;
}