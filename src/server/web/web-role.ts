import * as ApplicationRole from '../application-role';
import * as express from 'express';
//import * as userApi from './user-api';
import * as http from 'http';
import Environment from '../environment';
import * as path from 'path';

export default class WebRole implements ApplicationRole.RoleInstance {
	public type = ApplicationRole.Type.WEB;

	public start() {
		const root = path.resolve(__dirname+'/../../');
		const nodeModulesRoot = path.resolve(__dirname + '/../../../node_modules');

		var app = express();
		app.set('port', Environment.port);

		app.use(express.static(root));
		app.use('/node_modules', express.static(nodeModulesRoot));

		//app.use(userApi.api);

		app.get('/omfg', (req: any, res: any) => res.send('Lol it works! :)'));
		app.get('/appAuth/clientId', (req, res) => res.send(Environment.clientId));

		http.createServer(app).listen(app.get('port'), () => {
			console.log('Express server listening on port ' + app.get('port'));
		});

	}
}
