import Environment from './environment';

export enum Type {
    WEB,
    BACKGROUND,
}

export interface RoleInstance {
	type: Type;
	start(): any;
}

export class Initializer {
	private roles: { [roleId: number]: RoleInstance };

	public registerRole(role: RoleInstance) {
		this.roles[role.type] = role;
	}

	public startRoles() {
		Environment.roles.forEach(roleId => {
			var role = this.roles[roleId];
			if (!role) {
				throw new Error('No executor registered for role: ' + Type[roleId]);
			} else {
				role.start();
				console.debug("Role started: " + Type[roleId]);
			}
		});
	}

}
