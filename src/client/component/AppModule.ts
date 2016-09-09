import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MainComponent } from './MainComponent';
import { MainNavigation } from './navigation/MainNavigation';
import { UserCard } from './user/UserCard';
import { LoginComponent } from './login/LoginComponent';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ MainComponent, MainNavigation, UserCard, LoginComponent ],
  bootstrap:    [ MainComponent ]
})
export class AppModule { }
