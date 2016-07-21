import TableService from '../tables/table-service';

export function setUpTables(): void {
	var tableService = new TableService();
	tableService.initializeTables();
}


