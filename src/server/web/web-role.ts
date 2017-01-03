import * as ApplicationRole from '../application-role';
import * as express from 'express';
//import * as userApi from './user-api';
import * as http from 'http';
import Environment from '../environment';
import * as path from 'path';

let feathers: any = require('feathers');
let rest: any = require('feathers-rest');
let hooks: any = require('feathers-hooks');
let socketio: any = require('feathers-socketio');
let authentication: any = require('feathers-authentication');
let GoogleStrategy: any = require('passport-google-oauth20').Strategy;

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';

export default class WebRole implements ApplicationRole.RoleInstance {
	public type = ApplicationRole.Type.WEB;

	private authenticationOptions = {
		google: {
			strategy: GoogleStrategy,
			clientID: Environment.clientId,
			clientSecret: Environment.clientSecret,
			permissions: {
				authType: 'rerequest',
				scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"]
			}

		}
	}

	public start() {
		this.startExpress();
	}

	public startExpress() {
		const root = path.resolve(__dirname+'/../../');
		const nodeModulesRoot = path.resolve(__dirname + '/../../../node_modules');

		var app = express();
		app.set('port', Environment.port);

		app.use(express.static(root));
		app.use('/node_modules', express.static(nodeModulesRoot));
		app.all('/*', (req, res) => res.sendFile('index.html', { root: root })); //enabling html5 mode

		//app.use(userApi.api);

		app.get('/omfg', (req: any, res: any) => res.send('Lol it works! :)'));
		app.get('/appAuth/clientId', (req, res) => res.send(Environment.clientId));

		http.createServer(app).listen(app.get('port'), () => {
			console.log('Express server listening on port ' + app.get('port'));
		});

	}

	private startFeathers() {
		const root = path.resolve(__dirname+'/../../');
		const nodeModulesRoot = path.resolve(__dirname + '/../../../node_modules');

		const app: express.Express = feathers();
		app
			.use(compression())
			.options('*', cors())
			.use(express.static(root))
			.use('/node_modules', express.static(nodeModulesRoot))
			.all('/*', (req, res) => res.sendFile('index.html', { root: root })) //enabling html5 mode
			.use(bodyParser.json())
			.use(bodyParser.urlencoded({ extended: true }))
			.configure(hooks())
			.configure(rest())
			.configure(authentication(this.authenticationOptions))
			.configure(socketio());

		app.listen(Environment.port);
	};
}
