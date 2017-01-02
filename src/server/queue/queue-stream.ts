import * as streams from 'stream';
import * as azure from 'azure';
import QueueService from './queue-service';
import * as Queue from './queue';

export class QMessage<D> {
	constructor(public message: azure.QueueMessageResult) {

	}

	get data(): Readonly<D> {
		return JSON.parse(this.message.messagetext);
	}
}

export class QueueStream<D> extends streams.Duplex {
	constructor(
			public queueName: Queue.Name,
			public service: QueueService,
			public messageGetCount = 50
	) {
			super({ objectMode: true });
	}

	async _read() {
		let messages = await this.service.getMessages(this.queueName, { numofmessages: this.messageGetCount });
		messages.forEach(message => this.push(new QMessage<D>(message)));
	}

	async _write(data: D, enc: string, done: Function) {
		await this.service.createMessage(this.queueName, JSON.stringify(data));
		done();
	}
}
