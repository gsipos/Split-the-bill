/// <reference path="references.ts" />

module SplitTheBill.Client{
	
	var app = angular.module('SplitTheBill', ['ngMaterial'])
		.directive('stbUserEdit', User.StbUserEditDirective);
	
}
