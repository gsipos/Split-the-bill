/// <reference path="../references.ts" />
"use strict";

import * as streams from 'stream';
import * as azure from 'azure';
import QueueService from './queue-service';
import * as queues from './queues';

export default class QueueStream extends streams.Readable {
    
    
    constructor(
        public queueName: queues.Queues,
        public service: QueueService
    ) {
        super({ objectMode: true });
    }
    
    _read(size: number): void {
        this.service.getMessages(this.queueName, { numofmessages: size }).then(messages => {
            messages.forEach(message => this.push(message));
         });
    }
}

export class ParseMessageStream<T> extends streams.Transform {
    constructor() {
        super({ objectMode: true});
    }
    
    _transform(chunk: azure.QueueMessageResult, encoding: string, done: Function) {
        let parsedMessage: QueueMessageObject<T> = {
            message: chunk,
            content: JSON.parse(chunk.messagetext)
        };
        this.push(parsedMessage);
        done();
    }
}

export class DeleteMessageStream extends streams.Writable {
    constructor(
        public queueName: queues.Queues,
        public service: QueueService
    ) { super({ objectMode: true }); }
    
    _write(chunk: QueueMessageObject<any> & azure.QueueMessageResult, encoding: string, done: Function) {
        var messageId = chunk.messageid || chunk.message.messageid;
        var popreceipt = chunk.popreceipt || chunk.message.popreceipt;
        this.service.deleteMessage(this.queueName, messageId, popreceipt).then(() => done());
    }
}

export interface QueueMessageObject<T> {
    message: azure.QueueMessageResult;
    content: T;
} 