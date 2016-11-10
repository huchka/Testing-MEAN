var app = angular.module('myApp', []);
app.controller('appCtrl', function($scope, $http) {
    console.log("Hello World from controller");

var refresh = function () {
  $http.get('/contactlist').success(function (response) {
    // console.log("I got data in get method");
    $scope.contactlist = response;
    if (typeof $scope.contact != 'undefined') {
      $scope.contact = "";
    }
  })
}

$scope.addContact = function () {
  //console.log($scope.contact);

  $http.post('/contactlist', $scope.contact).success(function (response) {
    //console.log("I got data in post method");
    //console.log(response);
    refresh();
  });
}

$scope.removeContact = function (id) {
  //console.log(id);
  $http.delete('/contactlist/' + id).success(function (response) {
    refresh();
  })
}

$scope.editContact = function (id) {
  //console.log(id)
  $http.get('/contactlist/' + id).success(function (response) {
    $scope.contact = response;
  })
}

$scope.updateContact = function () {
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function (response) {
    refresh();
  })
}

$scope.clearInput = function () {
  $scope.contact = "";
}

refresh();

});
