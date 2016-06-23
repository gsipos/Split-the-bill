/// <reference path="../references.ts" />
import QueueService from './queue-service';
import {QueueStream} from 'queue-stream';
import {Queues} from 'queues';
import * as hl from 'highland';

export default class QueueManager {
    qSvc: QueueService = new QueueService();
    
    bootstrap() {
        
    }
    
    registerQueueProcessor(queueName: string) { }

    createQueue<D>(name: Queues) {
        return new QueueStream<D>(name, this.qSvc);
    }

    setupSaveExpensePipe() {
        let saveExpenseQStream = new QueueStream<any>(Queues.SAVE_EXPENSE, this.qSvc);
        
    }
} 