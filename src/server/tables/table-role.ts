import { RoleInstance, Type } from "../application-role";
import TableService from "./table-service";

export class TableRole implements RoleInstance {
	public type = Type.TABLE;

	public start() {
		const tableService = new TableService();
		tableService.initializeTables();
	}
}
