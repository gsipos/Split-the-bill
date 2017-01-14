import { Initializer } from './application-role';
import WebRole from './web/web-role';
import { TableRole } from './tables/table-role';
console.log('STB starting...');
console.log("Working in directory: ", __dirname);

var roleInitializer = new Initializer();

roleInitializer.registerRole(new WebRole());
roleInitializer.registerRole(new TableRole());

roleInitializer.startRoles();

console.log('STB end :(');
