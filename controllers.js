angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.click = function(data){
    var dataa = data.name;
    console.log(dataa);
  }
})

.controller('ChatsCtrl', function($scope, $http, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $http.get('/api/chats.json').then(function(data){
    $scope.myChats = data;
  })
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})



.controller('loginCtrl',function($scope,$http,$state){

  $scope.userData = [];
  $scope.signinData = [];

  $scope.login = function(userData){
    var username = userData.username;
    var password = userData.password;
      alert(" Signup sucess");
    $http.post('http://127.0.0.1/api/insert.php',{
      username : username,
      password : password
    }).then(function(res){
      $scope.responseData = res;
      
    })
  }


  $scope.signin = function(signinData){
    var username = signinData.username;
    var password = signinData.password;
      
    $http.post('http://127.0.0.1/api/signin.php',{
      username : username,
      password : password
    }).then(function(res){
      $scope.responseData = res;
      if($scope.responseData.data == "true"){
        $state.go('tab.dash');
      }else{
        $scope.errorMessage = "Login failure!";
      }
    })

  }
 

})




.controller('AccountCtrl', function($scope,Chats) {
  $scope.settings = {
    enableFriends: true
  };
$scope.chatss=Chats.all();
});
