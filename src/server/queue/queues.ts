export enum Queues {
    SAVE_EXPENSE
}

export function getName(q: Queues): string { return Queues[q]; }
