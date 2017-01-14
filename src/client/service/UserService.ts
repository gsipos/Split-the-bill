
import { GoogleAuthService } from './auth/GoogleAuthService';
import { Observable } from 'rxjs';

export interface UserProfile {
	name: string;
	email: string;
	id: string;
	imageUrl: string;
}


export class UserService {
	public userProfile: Observable<UserProfile | undefined>;

	constructor(
	 googleAuthService: GoogleAuthService) {
		//this.userProfile = googleAuthService.userBasicProfile.map(p => this.extractUserData(p));
	}

	private extractUserData(basicProfile: gapi.auth2.BasicProfile): UserProfile | undefined {
		if (basicProfile) {
			return {
				email: basicProfile.getEmail(),
				name: basicProfile.getName(),
				id: basicProfile.getId(),
				imageUrl: basicProfile.getImageUrl()
			}
		} else {
			return undefined;
		}
	}
}
