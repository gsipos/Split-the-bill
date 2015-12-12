/// <reference path="references.ts" />

module SplitTheBill.Client{
	
	angular.module('SplitTheBill', ['ngMaterial'])
		.directive('stbUserEdit', User.StbUserEditDirective);
	
}
