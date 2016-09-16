import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UserService } from '../service/UserService';

import { MainComponent } from './MainComponent';
import { MainNavigation } from './navigation/MainNavigation';
import { UserCard } from './user/UserCard';
import { LoginComponent } from './login/LoginComponent';

@NgModule({
  imports:      [ BrowserModule ],
	declarations: [MainComponent, MainNavigation, UserCard, LoginComponent],
	providers: [UserService],
  bootstrap:    [ MainComponent ]
})
export class AppModule { }
