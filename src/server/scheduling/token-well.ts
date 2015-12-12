/// <reference path="../../../typings/tsd.d.ts" />
"use strict";

export enum TokenWellState {
	DEPLETED,
	REFILLING,
	FULL
}

export default class TokenWell {
	private count: number = this.size;
	private timeout: NodeJS.Timer;
	
	constructor(private size: number, public rechargeRate: number = 1000) {
		
	}
	
	public consumeToken(): void {
		if (this.count < 1) {
			throw new Error('Token well is empty, consuming token not possible!');
		}
		this.count--;
		this.scheduleRefill();
	}
	
	public get totalRechargeRate() { return this.count * this.rechargeRate; }
	public set totalRechargeRate(totalRechargeRate: number) {
		if (totalRechargeRate < 1) {
			this.rechargeRate = 0;
		} else {
			this.rechargeRate = totalRechargeRate / this.size;
		}
	}
	 
	public get state(): TokenWellState {
		switch (this.count) {
			case 0: return TokenWellState.DEPLETED;
			case this.size: return TokenWellState.FULL;    
			default: return TokenWellState.REFILLING;
		}
	}
	
	public get depleted(): boolean { return this.state === TokenWellState.DEPLETED; }
	 
	private scheduleRefill() {
		if (this.state !== TokenWellState.FULL) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => this.fill(), this.rechargeRate);
		 }
	}
	
	private fill() {
		if (this.count < this.size) {
			this.count++;
		}
		this.scheduleRefill();
	}
}