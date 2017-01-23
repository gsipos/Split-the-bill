
declare var gapi: any | undefined;

class GapiLoadIndicatorServiceImpl {

	public readonly gapiLoaded: Promise<any>;
	public readonly gapiClienLoaded: Promise<any>;

	constructor() {
		this.gapiLoaded = this.checkIfPresent(() => !!window['gapi'], () => (gapi));
		this.gapiClienLoaded = this.checkIfPresent(() => !!window['gapi'] && gapi.client, () => gapi.client);
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

export const GapiLoadIndicatorService = new GapiLoadIndicatorServiceImpl();
