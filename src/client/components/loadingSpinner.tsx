import * as React from "react";
import "./loadingSpinner.css";

export class LoadingSpinner extends React.Component < undefined, undefined > {
	render() {
		return (
			<div className="loading-spinner">&#8721;</div>
		);
	}
}
