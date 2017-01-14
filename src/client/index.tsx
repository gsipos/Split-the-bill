import * as React from "react";
import * as ReactDOM from "react-dom";

import "./styles/animation.css";
import "./styles/button.css";
import "./index.css";

import { Login } from "./components/login";

export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, undefined> {
		render() {
				return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
	}
}

ReactDOM.render(
		<Login />,
		document.getElementById("splitTheBillRoot")
);
