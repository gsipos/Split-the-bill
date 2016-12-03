import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } 				from '@angular/platform-browser';
import { RouterModule } 	from '@angular/router';

import { UserService } from '../service/UserService';
import { GoogleAuthService } from '../service/auth/GoogleAuthService';
import { GapiLoadIndicatorService } from '../service/auth/GapiLoadIndicatorService';

import { AppRoutes } 						from './AppRoutes';
import { MainComponent } 				from './MainComponent';
import { MainNavigation } 			from './navigation/MainNavigation';
import { UserCard } 						from './user/UserCard';
import { LoginComponent } 			from './login/LoginComponent';

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(AppRoutes),
		HttpModule
	],
	declarations: [
		MainComponent,
		MainNavigation,
		UserCard,
		LoginComponent
	],
	providers: [UserService, GoogleAuthService, GapiLoadIndicatorService],
	bootstrap: [MainComponent]
})
export class AppModule { }
