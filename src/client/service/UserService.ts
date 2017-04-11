import { firebase, loggedIn, database } from './firebase.service';

class UserService {

	constructor() {
		this.ensureUserEntityExists();
	}

	public ensureUserEntityExists() {
		debugger;
		loggedIn
			.then(() => database
				.ref('user')
				.child(firebase.auth().currentUser.uid)
				.once('value'))
			.then(snapshot => !snapshot && database
				.ref(this.currentUserPath)
				.set(this.createUser()));
	}

	private createUser() {
		const currentUser = firebase.auth().currentUser;
		return {
			name: currentUser.displayName,
			email: currentUser.email,
			profilePicture: currentUser.photoURL,
			groupKeys: <string[]>[]
		};
	}

	public get currentUserPath() {
		return 'user/' + firebase.auth().currentUser.uid;
	}
}

export const userService = new UserService();
