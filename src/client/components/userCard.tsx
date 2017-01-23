import * as React from "react";
import "./userCard.css";

interface UserCardProps {
	name: string;
	image: string;
	email: string;
}

export class UserCard extends React.Component<UserCardProps, any> {
	render() {
		return (
			<div className="userCard row">
				<img className="image" src={this.props.image} alt={this.props.email} />
				<div className="container col">
					<div className="name">{this.props.name}</div>
					<div className="email">{this.props.email}</div>
				</div>
			</div>
		);
	}
}
