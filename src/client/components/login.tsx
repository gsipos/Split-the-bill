import * as React from "react";
import { Subscription } from "rxjs";
import "./login.css";

import { LoadingSpinner } from "./loadingSpinner";
import { Footer } from "./footer";

import { GoogleAuthService, AuthState } from "../service/auth/GoogleAuthService";

interface LoginState {
	authState: AuthState;
}

export class Login extends React.Component<any, LoginState> {
	private authStateSubscription: Subscription;

	constructor() {
		super();
		this.state = {
			authState: AuthState.LOADING_LIB
		};
	}

	componentDidMount() {
		this.authStateSubscription = GoogleAuthService.authState.subscribe({
			next: s => this.setState({ authState: s })
		});
	}

	componentWillUnmoun() {
		this.authStateSubscription.unsubscribe();
	}

	render() {
		return (
			<div className="loginPage container col">
				<div className="container row">
					<div className="loginContent container col center-center fade-right-in">
						<h1>Split the bill</h1>
						<LoadingSpinner />
					</div>
					<div className="loginUserSignin container center-center fade-right-in">
						<button className="button glow primary" onClick={(e) => this.onSignIn()}>
							<span>Sign in with Google</span>
						</button>
						<div>{this.getAuthStateMessage(this.state.authState)}</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	private getAuthStateMessage(authState: AuthState) {
		switch (authState) {
			case AuthState.LOADING_LIB: return "Preparing authentication.";
			case AuthState.INITIALIZING: return "Initializing.";
			case AuthState.CHECKIN_SIGIN: return "Checking who you are.";
			case AuthState.USER_SIGNER_IN: return "You're signed in.";
			case AuthState.NO_SIGNED_IN_USER: return "Please sign in.";
		}
	}

	private onSignIn() {
		GoogleAuthService.signIn();
	}
}
