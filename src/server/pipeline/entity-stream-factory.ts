import { AbstractEntityService } from "../tables/abstract-entity-service";
import { Entity } from "../tables/tables";
import * as streams from "stream";

export class EntityStreamFactory {

	public insertStream<E extends Entity>(entityName: string, entityService: AbstractEntityService<E>) {
		return new EntityOperationStream<E>(e => entityService.insert(e));
	}

}

export class EntityOperationStream<E extends Entity> extends streams.Writable {
	constructor(
	private operation: (e: E) => any
	) {
		super({ objectMode: true });
	}

	async _write(entity: E, enc: string, done: Function) {
		await Promise.resolve(this.operation(entity));
		done();
	}
}

export class EntityInsertStream<E extends Entity> extends EntityOperationStream<E> {
	constructor(entityService: AbstractEntityService<E>) {
		super(e => entityService.insert(e));
	}
}

export class EntityDeleteStream<E extends Entity> extends EntityOperationStream<E> {
		constructor(entityService: AbstractEntityService<E>) {
		super(e => entityService.delete(e));
	}
}
