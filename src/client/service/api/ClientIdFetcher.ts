import 'whatwg-fetch';

class ClientIdFetcherImpl {
	public readonly clientId: Promise<string>;

	constructor() {
		this.clientId = fetch('/appAuth/clientId').then(res => res.text());
	}
}
