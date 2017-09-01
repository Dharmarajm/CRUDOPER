angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('loginController', function($scope,$rootScope, $stateParams,$http,$state) {
  $scope.new = function(){
    $state.go('app.new');
  }
  
  $scope.show = function(data1){
     $rootScope.profile = data1;
     $state.go('app.show');
  }

  $scope.update = function(profile){
    //$rootScope.profile = profile;
    $scope.data = profile;
    $rootScope.update = true;
    localStorage.setItem("data",JSON.stringify($scope.data));
    /*$scope.profiles.indexOf(profile); */
    $state.go('app.new');
  }

  $scope.delete = function(profile,$index){
    $scope.profile= profile;
    console.log( $scope.profiles );
     $scope.profiles.splice($index,1);
    $http.delete("http://192.168.1.60:3002/profiles/delete",{params:{ "format": $scope.profile }}).success(function(response){
      $scope.done = response;
      //$state.go('app.login', {}, {reload: true});
    })
    .error(function(status){
      $scope.error = status;
    })
  }
  
  $scope.check = function(){
    $http.get("http://192.168.1.60:3002/profiles/index").success(function(response){
       $scope.profiles=response;
    })
    .error(function(status){
      $scope.things=status;
    })
  }
  $scope.check();
})

.controller('showController', function($scope,$rootScope, $stateParams,$state) {
 $scope.show = function(){
    $scope.pro = $rootScope.profile;
    console.log($scope.pro);
  }
  $scope.show();
})

.controller('newController',function($scope, $stateParams,$http,$state,$rootScope){

if ($rootScope.update == true){
  $scope.data = JSON.parse(localStorage.getItem("data"));
  console.log($scope.data);
  $scope.user = {
                  Name: $scope.data.name,
                  Age: $scope.data.age,
                  Gender: $scope.data.gender,
                  city: $scope.data.city,
                  state: $scope.data.state
                };
                $rootScope.update = false;
}
  
  $scope.add = function(user){
    $scope.log = user;
    alert($scope.log);
    $http.post("http://192.168.1.60:3002/profiles/create",$scope.log).success(function(response){
      $scope.new = response;
      console.log($scope.new);
      $state.go('app.login');
    })
    .error(function(status){
      $scope.data = status;
    })
  }
  
  $scope.update = function(profile){
    $scope.file = $rootScope.profile
    console.log($scope.file);
    /*$scope.set = $scope.profile.indexOf(profile);*/
      $http.put("http://192.168.1.60:3002/profiles/update",$scope.file).success(function(response){
      $scope.edit = response;
     /* $state.go('app.login');*/
         
    })
    .error(function(status){
      $scope.go = status;
    })
  }
})


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {


    $scope.index = 0;
    $scope.tables = [];
    $scope.loadNew = function() {
        $http.get(/*url*/).success(function(result) {
            $scope.tables.push({rows: result, cols: Object.keys(result)});
        });
        $scope.index++;
    }
});
