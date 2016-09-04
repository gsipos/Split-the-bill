import QueueService from './queue-service';
import {QueueStream} from './queue-stream';
import * as Queue from './queue';
//import * as hl from 'highland';

export default class QueueManager {
    qSvc: QueueService = new QueueService();

    bootstrap() {

    }

//    registerQueueProcessor(queueName: string) { }

    createQueue<D>(name: Queue.Name) {
        return new QueueStream<D>(name, this.qSvc);
    }

    setupSaveExpensePipe() {
//        let saveExpenseQStream = new QueueStream<any>(Queues.SAVE_EXPENSE, this.qSvc);

    }
}
