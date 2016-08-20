import { Component } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';

@Component({
	selector: 'stb-user-card',
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
  <img [src]="user.profilePicture" class="grow">

  <div class="mdl-card__actions">
    <h2 class="mdl-card__title-text">{{user.balance}}</h2>
		{{user.name}}
  </div>
</div>
	`
})

export class UserCard {
	public user = {
		name: "John Doe",
		profilePicture: "https://placeimg.com/400/400/people",
		balance: 17353
	}
}
