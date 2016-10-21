import { Injectable } from '@angular/core';

declare var gapi: any;

@Injectable()
export class GapiLoadIndicatorService {

	public readonly gapiLoaded: Promise<any>;
	public readonly gapiClienLoaded: Promise<any>;

	constructor() {
		this.gapiLoaded = this.checkIfPresent(() => !!gapi, () => gapi);
		this.gapiClienLoaded = this.checkIfPresent(() => !!gapi.client, () => gapi.client);
	}

	private checkIfPresent<T>(predicate: () => boolean, getResult: () => T): Promise<T> {
		if (predicate()) {
			return Promise.resolve(getResult());
		} else {
			return new Promise((resolve, reject) =>
				setImmediate(() =>
					resolve(this.checkIfPresent(predicate, getResult))));
		}
	}


}
