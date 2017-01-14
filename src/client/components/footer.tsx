import * as React from "react";
import "./footer.css";

export class Footer extends React.Component<undefined, undefined> {
	render() {
		return (
			<div className="footer">
				<span className="devName">@Gergely Sipos</span>
				<a className="button glow" href="https://github.com/gsipos/Split-the-bill#split-the-bill" target="_blank">
					<span>Github</span>
				</a>
			</div>
		);
	}
}
