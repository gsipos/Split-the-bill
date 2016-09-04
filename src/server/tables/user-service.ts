import * as Model from '../../shared/split-the-bill';
import * as Table from './table';
import * as tables from './tables';
import { AbstractEntityService } from './abstract-entity-service';
import * as uuid from 'node-uuid';

export default class UserService extends AbstractEntityService<tables.User> {
	tableName = Table.USER;

	public insert(user: Model.User) {
		user.RowKey = uuid.v4();
		return this.tableService.insertEntity(this.convertModelUserToRow(user), Table.USER);
	}

	public convertModelUserToRow(user: Model.User): tables.User {
		var row = new tables.User();

		row.RowKey = user.RowKey;
		row.PartitionKey = user.PartitionKey;
		row.name = user.name;
		row.profilePicture = user.profilePicture;

		return row;
	}

	public addGroupKey(user: Model.User, groupKey: tables.Key) {
		const userGroupKeys: tables.Key[] = JSON.parse(user.groupKeys);
		userGroupKeys.push(groupKey);
		user.groupKeys = JSON.stringify(userGroupKeys);
		return user;
	}
}
