import * as Table from './table';
import * as tables from './tables';
import { AbstractEntityService } from './abstract-entity-service';

export class GroupService extends AbstractEntityService<tables.Group> {
	tableName = Table.GROUP;
}
