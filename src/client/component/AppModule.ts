import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MainComponent } from './MainComponent';
import { MainNavigation } from './navigation/MainNavigation';
import { UserCard } from './user/UserCard';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ MainComponent, MainNavigation, UserCard ],
  bootstrap:    [ MainComponent ]
})
export class AppModule { }
