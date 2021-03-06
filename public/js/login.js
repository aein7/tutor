(function() {
	angular.module('tutorApp').controller('loginCtrl', ['$scope', '$http', 'auth', 'store', '$location',
		function ($scope, $http, auth, store, $location) {
			$scope.loggedIn = false;

		  $scope.login = function () {
		    auth.signin({}, function (profile, token) {
		      $scope.loggedIn = true;
  				$scope.auth = auth;
		      // Success callback
		      store.set('profile', profile);
		      store.set('token', token);
		      $location.path('/');
             
            var oldid = auth.profile.user_id;   
            var newid = oldid.replace(/^\D+\w+\|/g, ""); 
            var finalid = newid.slice(0,18);
            var id = finalid;    
            var name = auth.profile.name;   
              $http({method: 'POST', url: '/?id='+id+'&name='+name}).success(function(data,status){
                
                  $scope.dataset = data;});
                
                
                
                
                
		    }, function () {
		      // Error callback
		    });
		  }

		  $scope.logout = function() {
		      $scope.loggedIn = false;
		    	console.log("Logout");
			  auth.signout();
			  store.remove('profile');
			  store.remove('token');
		  }
	}]);
})();