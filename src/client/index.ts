/// <reference path="./references.ts" /> 
"use strict";

module SplitTheBill.Client{
	
	angular.module('SplitTheBill', ['ngMaterial'])
		.directive('stbUserEdit', User.StbUserEditDirective);
	
}
