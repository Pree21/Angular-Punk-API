var app = angular.module('beerApp', ['ngMaterial']);
//Material Design Theme Configuration
app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');
	});
app.controller('webController', function($scope,dataService) {
	$scope.loading = true;
	var init = function(){
	 	dataService.getBeers(80).then(function(data){ //get data from service here total record getting is 80
			$scope.beers = data;
			$scope.loading = false;
		});
	};
	angular.element('[ng-controller=webController]').ready(init);
});

