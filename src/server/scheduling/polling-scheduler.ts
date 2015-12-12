/// <reference path="../../../typings/tsd.d.ts" />
import TokenWell from './token-well';

export interface PollScheduleCallBack {
	(): Promise<any>;
}

export interface PollingPolicy {
	speedUp(current: number, min: number, max: number): number;
	backOff(current: number, min: number, max: number): number;
}

export class LinearPollingPolicy implements PollingPolicy {
	speedUp(current: number, min: number, max: number) {
		return Math.min(max, current + min);
	}
	
	backOff(current: number, min: number, max: number) {
		return Math.max(min, current - min);
	}
} 

export class ExponentialPollingPolicy implements PollingPolicy {
	speedUp(current: number, min: number, max: number) {
		return Math.min(max, current**2);
	}
	
	backOff(current: number, min: number, max: number) {
		return Math.max(min, Math.sqrt(current));
	}
}

export class PollingScheduler {
	private interval: NodeJS.Timer;
	private currentPollInterval: number = this.minPollInterval;

	constructor(
		private pollCallback: PollScheduleCallBack,
		private minPollInterval: number,
		private maxPollInterval: number,
		private pollingPolicy: PollingPolicy) {

	}

	private schedule() {
		clearInterval(this.interval);
		this.interval = setInterval(() => this.poll(), this.currentPollInterval);
	}

	private poll() {
		this.pollCallback().then(() => {
			this.speedUp();
		}, () => {
			this.backOff();
		});
		this.schedule();
	}

	private speedUp() {
		this.currentPollInterval = this.pollingPolicy.speedUp(this.currentPollInterval, this.minPollInterval, this.maxPollInterval);
	}

	private backOff() {
		this.currentPollInterval = this.pollingPolicy.backOff(this.currentPollInterval, this.minPollInterval, this.maxPollInterval);
	}
}
