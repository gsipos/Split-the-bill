import * as React from "react";
import * as ReactDOM from "react-dom";

import "./styles/animation.css";
import "./styles/button.css";
import "./index.css";

import { Login } from "./components/login";
import "./service/firebase.service";

ReactDOM.render(
		<Login />,
		document.getElementById("splitTheBillRoot")
);
