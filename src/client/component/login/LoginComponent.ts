import { Component } from '@angular/core';
import { MDL } from '../MaterialDesignLiteUpgradeElement';

@Component({
	selector: 'stb-login',
	template: `
	<div class="mdl-card mdl-shadow--4dp">
  	<div class="mdl-card__title">Login with Google</div>
			<button
				class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
				href=".auth/login/google">
				Button
			</button>
  	<div class="mdl-card__actions"></div>
	</div>
	`
})
export class LoginComponent {

}
