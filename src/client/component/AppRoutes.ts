import { Route } from '@angular/router';

import { LoginComponent } from './login/LoginComponent';

const login: Route = { path: 'login', component: LoginComponent }

export const AppRoutes: Route[] = [
	login
];
