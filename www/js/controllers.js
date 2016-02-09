angular.module('starter.controllers', [])


.controller('noteListCtrl', function($scope) {

  $scope.notelist = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

})//end of controller

.controller('mainCtrl', function($scope, $state) {

  var newNote = document.getElementById('new-note-button');
  $scope.NewNote = function () {
    console.log('button works!');

    //loading new note partial
    $state.go('app.single', {url: '#/app/note/'});
  }

})//end of controller

.controller('noteCtrl', function($scope, $stateParams) {
  $scope.note = $stateParams;

});//end of controller
