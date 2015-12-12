/// <reference path="../../references.ts" />
module SplitTheBill.Client.User {
	
	export interface UserEditScope extends ng.IScope {
		response: string;
	}
	
	export function StbUserEditDirective(): ng.IDirective {
		return {
			restrict: 'E',
			templateUrl: 'app/user-edit/stb-user-edit.html',
			controller: StbUserEditController,
			controllerAs: 'userCtrl',
		};
	}
	
	export class StbUserEditController {
		 
		constructor(private $scope: UserEditScope, private $http: ng.IHttpService, private $log: ng.ILogService) {
		}
		 
		getUsers() {
			this.$http.get('http://split-the-bill.azurewebsites.net/allUsers')
				.then(response => this.$scope.response = angular.toJson(response))
				.catch(reason =>  this.$scope.response = angular.toJson(reason));
		}
		 
	}
}
