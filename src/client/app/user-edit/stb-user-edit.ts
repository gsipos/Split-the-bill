/// <reference path="../../references.ts" />
module SplitTheBill.Client.User {
	
	export interface UserEditScope {
		users: SplitTheBill.Model.User[];
		response: string;
	}
	
	export function StbUserEditDirective(): ng.IDirective {
		var directive: ng.IDirective = {};
		directive.restrict = 'A';
		directive.templateUrl = 'app/user-edit/stb-user-edit.html';
		directive.controller = StbUserEditController;
		directive.controllerAs = 'userCtrl';
		return directive;
	}
	
	export class StbUserEditController {
		 
		constructor(private $scope: UserEditScope, private $http: ng.IHttpService) {
			$http.get('http://split-the-bill.azurewebsites.net/allUsers').then(response => this.$scope.response = angular.toJson(response));
		}
		 
		
		 
	}
}
