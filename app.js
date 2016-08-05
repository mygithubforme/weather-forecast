// Module
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);


// Routes

weatherApp.config(function($routeProvider){

	$routeProvider
	.when('/',{
		templateUrl: 'pages/home.html',
		controller:'homeController'
	})

	.when('/forecast',{
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})

	.when('/forecast/:days',{
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})


});


// Service

weatherApp.service('cityService',function(){

	this.city = "New York";

});


// Controllers
weatherApp.controller('homeController',['$scope','cityService',function($scope, cityService){

	$scope.city = cityService.city;

	$scope.$watch('city', function(){

		cityService.city = $scope.city;
	});

}]);



weatherApp.controller('forecastController',['$scope','$resource','$routeParams','cityService',function($scope,$resource,$routeParams,cityService){

	$scope.city = cityService.city;
	//alert($scope.city);

	$scope.days = $routeParams.days || '2';

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=6d3dfd9e4d7e6270be313178a6bad401",{
		callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city+",USA", cnt: $scope.days });

	console.log($scope.weatherResult);

	$scope.convertToFehren = function (degree){

		return Math.round((1.8 * (degree - 273)) + 32);

	}


	$scope.convertToDate = function(dt){

		return new Date(dt * 1000);
	}


}]);


// Directive

weatherApp.directive('weatherReport',function(){

	return{

		restrict: 'E',
		templateUrl: 'directives/weatherReport.html',
		replace: true,
		scope: {

			weatherDay: "=",
			convertToStandard:"&",
			convertToDate: "&",
			dateFromat: "@"
		}

	}



});