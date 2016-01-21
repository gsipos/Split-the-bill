import * as scheduling from '../scheduling/polling-scheduler';
import TokenWell from '../scheduling/token-Well';
import QueueService from './queue-service';

export class BaseQueueProcessor extends NodeJS.EventEmitter {
    public queueName: string;
    public scheduler: scheduling.PollingScheduler;
    public tokenWell: TokenWell;
}


export default class QueueManager {
    qSvc: QueueService = new QueueService();
    
    bootstrap() {
        
    }
    
    registerQueueProcessor(queueName: string ) { }
    
} 