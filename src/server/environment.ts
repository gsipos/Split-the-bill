import * as appRoles from './application-role';

interface ProcessEnvironment {
	accountName: string;
	accountKey: string;
	PORT: number;
	roles: string;
}

export class Environment{

	private get env(): ProcessEnvironment { return process.env; }

	get accountName() { return this.env.accountName; }

	get accountKey() { return this.env.accountKey; }

	get port() { return this.env.PORT || 3000; }

	get roles(): appRoles.Type[] {
		return this.env.roles.split(',').map<appRoles.Type>(role => appRoles.Type[role]);
	}
}

var env = new Environment();
export default env;
