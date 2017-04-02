import { firebase } from './firebase.service';
import { Observable } from 'rxjs';

export interface UserProfile {
	name: string;
	email: string;
	id: string;
	imageUrl: string;
}


export class UserService {
	public userProfile: Observable<UserProfile | undefined>;

	constructor() {
		//this.userProfile = googleAuthService.userBasicProfile.map(p => this.extractUserData(p));
	}
}
