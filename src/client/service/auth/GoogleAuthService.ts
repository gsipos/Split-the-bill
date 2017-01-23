
import { GapiLoadIndicatorService } from "./GapiLoadIndicatorService";
import { BehaviorSubject } from 'rxjs';

export enum AuthState {
	LOADING_LIB,
	INITIALIZING,
	CHECKIN_SIGIN,
	NO_SIGNED_IN_USER,
	USER_SIGNER_IN,
	ERROR
}

class GoogleAuthServiceImpl {
	private googleAuth: gapi.auth2.GoogleAuth;

	public authState = new BehaviorSubject<AuthState>(AuthState.LOADING_LIB);

	constructor() {
		this.authenticate();
	}

	private async authenticate(): Promise<any>{
		const gapi = await GapiLoadIndicatorService.gapiLoaded;
		await this.loadAuth2(gapi);
		const clientId = await this.getClientId();
		this.authState.next(AuthState.INITIALIZING);
		await this.initAuth2(gapi, clientId);
		this.authState.next(AuthState.CHECKIN_SIGIN);
		this.startAuthorization();
	}

	private async loadAuth2(gapi: any): Promise<any> {
		return new Promise((resolve, reject) =>
			gapi.load("client:auth2", resolve));
	}

	private async initAuth2(gapi: any, clientId: string): Promise<any> {
		return new Promise((resolve, reject) =>
			gapi.auth2.init({ client_id: clientId })
				.then(() => resolve()));
	}

	private startAuthorization() {
		this.googleAuth = gapi.auth2.getAuthInstance();
		this.googleAuth.isSignedIn.listen(isSignedId => this.updateSigninStatus(isSignedId));
		this.updateSigninStatus(this.googleAuth.isSignedIn.get());
	}

	private updateSigninStatus(isSignedIn: boolean) {
		if (isSignedIn) {
			this.authState.next(AuthState.USER_SIGNER_IN);
		} else {
			this.authState.next(AuthState.NO_SIGNED_IN_USER);
		}
	}

	private async getClientId(): Promise<string> {
		return fetch('/appAuth/clientId').then(res => res.text());
	}

	public get profile(): gapi.auth2.BasicProfile { return this.googleAuth.currentUser.get().getBasicProfile(); }

	public signIn(): void {
		this.googleAuth.signIn();
	}
}

export const GoogleAuthService = new GoogleAuthServiceImpl();
