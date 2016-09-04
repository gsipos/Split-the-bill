import * as azure from 'azure';
import Environment from '../environment';
import * as Queue from './queue';

export default class QueueService{
    public queueClient: azure.QueueService;

    constructor() {
        var retryOperations = new azure.ExponentialRetryPolicyFilter();
        this.queueClient = <azure.QueueService>azure.createQueueService(Environment.accountName, Environment.accountKey).withFilter(retryOperations);
    }

    getMessages(queueName: Queue.Name, options?: azure.GetQueueMessagesOptions): Promise<azure.QueueMessageResult[]> {
        return new Promise((resolve, reject) =>
            this.queueClient.getMessages(queueName, options!, this.promiseCallback(resolve, reject)));
    }

    deleteMessage(queueName: Queue.Name, messageId: string, popreceipt: string): Promise<boolean> {
        return new Promise((resolve, reject) =>
            this.queueClient.deleteMessage(queueName, messageId, popreceipt, this.promiseCallback(resolve, reject)));
    }

    createMessage(queueName: Queue.Name, messageText: string): Promise<azure.QueueMessageResult> {
        return new Promise((resolve, reject) => this.queueClient.createMessage(queueName, messageText, this.promiseCallback(resolve, reject)));
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
