/// <reference path="../references.ts" />
"use strict";

import * as streams from 'stream';
import * as azure from 'azure';
import QueueService from './queue-service';

export default class QueueStream extends streams.Readable {
    
    
    constructor(
        public queueName: string,
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

export interface QueueMessageObject<T> {
    message: azure.QueueMessageResult;
    content: T;
} 