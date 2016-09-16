import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {
	public userProfile: any;

	constructor(http: Http) {
		http.get('https://www.googleapis.com/plus/v1/people/me')
			.subscribe(profileResponse => this.userProfile = profileResponse.json());
	}

}
