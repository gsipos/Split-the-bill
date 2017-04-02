import * as React from "react";
import { Subscription } from "rxjs";
import "./login.css";

import { LoadingSpinner } from "./loadingSpinner";
import { Footer } from "./footer";
import { UserCard }from "./userCard";
import { firebase, loggedIn } from "../service/firebase.service";

interface LoginState {
	loggedIn: boolean;
}

export class Login extends React.Component<any, LoginState> {
	private authStateSubscription: Subscription;

	constructor() {
		super();
		this.state = {
			loggedIn: false
		};
	}

	componentDidMount() {
		loggedIn.then(() => this.setState({ loggedIn: true }));
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
					<div className="loginUserSignin container col center-center fade-right-in">
						{!this.state.loggedIn &&
							<button className="button glow primary" onClick={(e) => this.onSignIn()}>
								<span>Sign in with Google</span>
							</button>
						}
						{this.state.loggedIn &&
							<UserCard
								name={firebase.auth().currentUser.displayName}
								email={firebase.auth().currentUser.email}
								image={firebase.auth().currentUser.photoURL}
							/>
						}

					</div>
				</div>
				<Footer />
			</div>
		);
	}

	private onSignIn() {

	}
}
