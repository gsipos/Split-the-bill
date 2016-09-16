import * as startup from  './startup/startup';
import * as ApplicationRole from './application-role';
import WebRole from './web/web-role';

console.log('STB starting...');
console.log("Working in directory: ", __dirname);
startup.setUpTables();

var roleInitializer = new ApplicationRole.Initializer();
roleInitializer.registerRole(new WebRole());

roleInitializer.startRoles();

console.log('STB end :(');
