/// <reference path="../references.ts" />
"use strict";

import * as streams from 'stream';
import * as azure from 'azure';
import Environment from '../environment';

export enum Queues {
    SAVE_EXPENSE
}

export default class QueueService{
    public queueClient: azure.QueueService;
    
    constructor() {
        var retryOperations = new azure.ExponentialRetryPolicyFilter();
        this.queueClient = <azure.QueueService>azure.createQueueService(Environment.accountName, Environment.accountKey).withFilter(retryOperations);
    }
    
    getMessages(queueName: Queues, options?: azure.GetQueueMessagesOptions): Promise<azure.QueueMessageResult[]> {
        return new Promise((resolve, reject) => this.queueClient.getMessages(this.getQueueName(queueName), (err, result, webResponse) => { 
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        }));
        
    }
    
    private getQueueName(q: Queues): string { return Queues[q]; }
}