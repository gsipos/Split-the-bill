import { Component } from '@angular/core';
import { UserService, UserProfile } from '../../service/UserService';

@Component({
	moduleId: module.id,
	selector: 'stb-user-card',
	providers: [UserService],
	templateUrl: "UserCard.html"
})

export class UserCard {
	public user: UserProfile;

	constructor(userService: UserService) {
		//userService.userProfile.subscribe(profile => this.user = profile);
	}
}
