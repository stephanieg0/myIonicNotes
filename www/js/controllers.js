angular.module('starter.controllers', ['idFactory', 'noteStorageFactory'])

//note list side bar
.controller('noteListCtrl', function($scope, $state, $stateParams, noteStorageFactory) {

  $scope.notelist = noteStorageFactory.setNoteObj();

  //getting single note id from stateParams.
  $scope.noteid = $stateParams.notelistId;




  // $scope.notelist = [
  //   { title: 'Reggae', id: 1 },
  //   { title: 'Chill', id: 2 },
  //   { title: 'Dubstep', id: 3 },
  //   { title: 'Indie', id: 4 },
  //   { title: 'Rap', id: 5 },
  //   { title: 'Cowbell', id: 6 }
  // ];

  $scope.HomeButton = function () {

    $state.go('app.main', {url: '#/app/main/'});
  }

})//end of controller

//main section for adding notes.
.controller('mainCtrl', function($scope, $state, idFactory, noteStorageFactory){

  //getting object to be used for later. It will be empty if local storage is empty.
  $scope.noteObject = noteStorageFactory.setNoteObj();

  $scope.NewNote = function () {

    //getting a unique id
    var noteid = idFactory.setId();

    $scope.notelist[noteid] = {
      title: 'untitled',
      content: ''
    }

    //setting note object in local storage.
    localStorage.setItem('notes', JSON.stringify($scope.notelist));

    //loading new note partial and storing noteid in $stateParams (view app.js app.single)
    $state.go('app.single', {url: '#/app/note/', notelistId: noteid});
  }

})//end of controller

//single note text area
.controller('noteCtrl', function($scope, $stateParams, noteStorageFactory) {
  //getting single note id from stateParams.
  $scope.noteid = $stateParams.notelistId;

  //getting entire note list obj to handpick id.
  $scope.notelist = noteStorageFactory.setNoteObj();

  //$scope.noteTitle = $scope.notelist[$scope.noteid].title;

  //$scope.noteContent = $scope.notelist[$scope.noteid].content;

  //watch function to save note.
  $scope.$watch('noteContent', function(){
    //console.log($scope.noteContent);
  });

});//end of controller
