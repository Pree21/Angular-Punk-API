app.factory('dataService', function($q,$http){
	var api = {};
	api.getBeers = function(count){
		var deferred = $q.defer();
		$http.get('https://api.punkapi.com/v2/beers?page=2&per_page='+count).then(function(response){
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};
	return api;
});
