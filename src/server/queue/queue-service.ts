import * as azure from 'azure';
import Environment from '../environment';
import * as queues from './queues';

export default class QueueService{
    public queueClient: azure.QueueService;

    constructor() {
        var retryOperations = new azure.ExponentialRetryPolicyFilter();
        this.queueClient = <azure.QueueService>azure.createQueueService(Environment.accountName, Environment.accountKey).withFilter(retryOperations);
    }

    getMessages(queueName: queues.Queues, options?: azure.GetQueueMessagesOptions): Promise<azure.QueueMessageResult[]> {
        return new Promise((resolve, reject) =>
            this.queueClient.getMessages(queues.getName(queueName), options!, this.promiseCallback(resolve, reject)));
    }

    deleteMessage(queueName: queues.Queues, messageId: string, popreceipt: string): Promise<boolean> {
        return new Promise((resolve, reject) =>
            this.queueClient.deleteMessage(queues.getName(queueName), messageId, popreceipt, this.promiseCallback(resolve, reject)));
    }

    createMessage(queueName: queues.Queues, messageText: string): Promise<azure.QueueMessageResult> {
        return new Promise((resolve, reject) => this.queueClient.createMessage(queues.getName(queueName), messageText, this.promiseCallback(resolve, reject)));
    }

    private promiseCallback<T>(resolve: Function, reject: Function): azure.StorageCallback<T> {
        return (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        };
    }
}
