/*import * as express from 'express';
import UserService from '../tables/user-service';

var userSvc = new UserService();
export var api: express.Express = express();

api.get('/user',
	(req, res) => userSvc.point(req.params.rowKey, req.params.partitionKey)
		.then(user => res.send(user)));

api.put('/user',
	(req, res) => userSvc.insert(req.body)
		.then(user => res.send(user)));

api.get('/allUsers', (req, res) => userSvc.getAll().then(userList => res.send(userList)));
*/
