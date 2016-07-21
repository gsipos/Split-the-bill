import * as streams from 'stream';
import * as azure from 'azure';
import QueueService from './queue-service';
import * as queues from './queues';

export class QueueResultHolder<D> {
    public data: D;
    constructor(public message: azure.QueueMessageResult) {
        this.data = JSON.parse(message.messagetext);
    }
}

export class QueueStream<D> extends streams.Duplex {
    public mesageGetCount: number = 50;
    constructor(
        public queueName: queues.Queues,
        public service: QueueService
    ) {
        super({ objectMode: true });
    }

    _read(): void {
        this.service.getMessages(this.queueName, { numofmessages: this.mesageGetCount }).then(messages => {
            messages.forEach(message => this.push(new QueueResultHolder(message)));
        });
    }

    _write(data: D): void {
        this.service.createMessage(this.queueName, JSON.stringify(data));
    }
}
