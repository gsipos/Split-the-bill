import * as startup from  './startup/startup';
import * as ApplicationRole from './application-role';
import WebRole from './web/web-role';

console.debug('STB starting...');
startup.setUpTables();

var roleInitializer = new ApplicationRole.Initializer();
roleInitializer.registerRole(new WebRole());

roleInitializer.startRoles();

console.debug('STB end :(');
