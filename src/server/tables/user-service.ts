/// <reference path="../references.ts" />
import Model = SplitTheBill.Model;

import * as tables from './tables';
import TableService from './table-service';
import * as uuid from 'node-uuid';

export default class UserService {
	private tableService = new TableService();

	public point(rowKey: string, partitionKey: string): Promise<tables.User> {
		return this.tableService.pointQueryEntity<tables.User>(partitionKey, rowKey, tables.Name.USER);
	}

	public insert(user: Model.User) {
		user.RowKey = uuid.v4();
		return this.tableService.insertEntity(this.convertModelUserToRow(user), tables.Name.USER);
	}

	public getAll(): Promise<tables.User[]> {
		return this.tableService.getAll(tables.Name.USER);
	}

	public convertModelUserToRow(user: Model.User): tables.User {
		var row = new tables.User();

		row.RowKey = user.RowKey;
		row.PartitionKey = user.PartitionKey;

		row.name = user.name;
		row['name@odata.type'] = tables.ODataType.String;

		row.profilePicture = user.profilePicture;
		row['profilePicture@odata.type'] = tables.ODataType.String;

		return row;
	}
}
