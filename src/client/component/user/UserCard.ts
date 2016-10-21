import { Component } from '@angular/core';
import { UserService, UserProfile } from '../../service/UserService';

@Component({
	selector: 'stb-user-card',
	providers: [UserService],
	template: `
<style>
.mdl-card__actions{
	color: white;
	background: rgba(0, 0, 0, 0.2);
}

img {
	position: absolute;
	width: 100%;
	z-index: -1;
	top:0;
}

.grow { transition: all .2s ease-in-out; }
.grow:hover { transform: scale(1.1); }
</style>

<div class="mdl-card mdl-shadow--4dp">
  <img [src]="user.imageUrl" class="grow">

  <div class="mdl-card__actions">
    <h2 class="mdl-card__title-text">{{user.balance}}</h2>
		{{user.name}}
		{{user.email}}
		{{user.id}}
  </div>
</div>
	`
})

export class UserCard {
	public user: UserProfile;

	constructor(userService: UserService) {
		userService.userProfile.subscribe(profile => this.user = profile);
	}
}
