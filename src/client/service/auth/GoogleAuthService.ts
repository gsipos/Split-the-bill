import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GapiLoadIndicatorService } from "./GapiLoadIndicatorService";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AsyncSubject, Observable } from 'rx';
import 'gapi';

@Injectable()
export class GoogleAuthService {
	private readonly clientIdUrl = "/appAuth/clientId";
	private readonly clientIdPromise = this.getClientId();
	private readonly auth2LibLoaded: Promise<void>;

	private googleAuth: gapi.auth2.GoogleAuth;

	private _userSignedIn: AsyncSubject<boolean> = new AsyncSubject<boolean>();
	public userBasicProfile: Observable<gapi.auth2.BasicProfile>;

	constructor(gapiLoadIndicator: GapiLoadIndicatorService, private http: Http) {
		this.auth2LibLoaded = new Promise((resolve, reject) =>
			gapiLoadIndicator.gapiLoaded
				.then(gapi => gapi.load("client:auth2"), () => resolve()));

		Promise.all([this.clientIdPromise, this.auth2LibLoaded])
			.then(resultVector => gapi.auth2.init({client_id: resultVector[0]}))
			.then(() => this.startAuthorization());

		this.userBasicProfile = this.userSignedIn.map<gapi.auth2.BasicProfile>(isSignedIn =>
			isSignedIn ? this.googleAuth.currentUser.get().getBasicProfile() : undefined);
	}

	private startAuthorization() {
		this.googleAuth = gapi.auth2.getAuthInstance();
		this.googleAuth.isSignedIn.listen(isSignedId => this.updateSigninStatus(isSignedId));
		this.updateSigninStatus(this.googleAuth.isSignedIn.get());
	}

	private updateSigninStatus(isSignedIn: boolean) {
		this._userSignedIn.onNext(isSignedIn);
	}

	private getClientId(): Promise<string> {
		return this.http.get(this.clientIdUrl)
			.map(res => res.json().data)
			.toPromise();
	}

	public get userSignedIn(): Observable<boolean> { return this._userSignedIn; }
	public get profile(): gapi.auth2.BasicProfile { return this.googleAuth.currentUser.get().getBasicProfile(); }
}
