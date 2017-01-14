import * as React from "react";
import "./login.css";

import { LoadingSpinner } from "./loadingSpinner";
import { Footer } from "./footer";

export class Login extends React.Component <any, undefined> {
	render() {
		return (
			<div className="loginPage container col">
				<div className="container row">
					<div className="loginContent container col center-center fade-right-in">
						<h1>Split the bill</h1>
						<LoadingSpinner />
					</div>
					<div className="loginUserSignin container center-center fade-right-in">
						<button className="button glow primary">
							<span>Sign in with Google</span>
						</button>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
