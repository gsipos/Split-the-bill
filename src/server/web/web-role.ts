import * as ApplicationRole from '../application-role';
import * as express from 'express';
//import * as userApi from './user-api';
import * as http from 'http';
import Environment from '../environment';

export default class WebRole implements ApplicationRole.RoleInstance {
	public type = ApplicationRole.Type.WEB;

	public start() {
		var app = express();
		app.set('port', Environment.port);
		app.set('app',  '../');
		app.use('/app', express.static('../'));
		app.use('/', express.static('../index.html'));
		//app.use(userApi.api);

		app.get('/omfg', (req: any, res: any) => res.send('Lol it works! :)'));

		http.createServer(app).listen(app.get('port'), () => {
			console.log('Express server listening on port ' + app.get('port'));
		});
	}
}
