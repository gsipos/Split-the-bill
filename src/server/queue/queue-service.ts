import * as azure from 'azure';
import Environment from '../environment';
import * as Queue from './queue';

const PromiseCallback = (resolve: Function, reject: Function) =>
	(err: any, result: any) =>
		err ? reject(err) : resolve(result);

export default class QueueService{
    public queueClient: azure.QueueService;

    constructor() {
        var retryOperations = new azure.ExponentialRetryPolicyFilter();
        this.queueClient = <azure.QueueService>azure.createQueueService(Environment.accountName, Environment.accountKey).withFilter(retryOperations);
    }

    async getMessages(queueName: Queue.Name, options?: azure.GetQueueMessagesOptions): Promise<azure.QueueMessageResult[]> {
				return new Promise<azure.QueueMessageResult[]>((resolve, reject) =>
						this.queueClient.getMessages(queueName, options, PromiseCallback(resolve, reject)));
    }

    async deleteMessage(queueName: Queue.Name, messageId: string, popreceipt: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) =>
            this.queueClient.deleteMessage(queueName, messageId, popreceipt, PromiseCallback(resolve, reject)));
    }

    async createMessage(queueName: Queue.Name, messageText: string): Promise<azure.QueueMessageResult> {
        return new Promise<azure.QueueMessageResult>((resolve, reject) => this.queueClient.createMessage(queueName, messageText, PromiseCallback(resolve, reject)));
    }
}
