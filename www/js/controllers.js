angular.module('starter.controllers', ['idFactory', 'noteStorageFactory'])

//note list side bar
.controller('noteListCtrl', function($scope, $state, noteStorageFactory) {

  $scope.notelist = noteStorageFactory.setNoteObj();

  console.log('noteListCtrl', $scope.notelist);

  //home button available in nav-bar
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
      content: 'this is content'
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

  $scope.noteTitle = $scope.notelist[$scope.noteid].title;

  $scope.noteContent = $scope.notelist[$scope.noteid].content;

  //watch function is watching the text area in html template
  $scope.$watch('noteContent', function(){

    //updating notelist object
    $scope.notelist[$scope.noteid] = {
      title: $scope.noteTitle,
      content: $scope.noteContent
    }

    //setting storage with new object
    localStorage.setItem('notes', JSON.stringify($scope.notelist));

  }, true);

  //watch function is watching the text area in html template
  $scope.$watch('noteTitle', function(){

    //updating notelist object
    $scope.notelist[$scope.noteid] = {
      title: $scope.noteTitle,
      content: $scope.noteContent
    }

    //setting storage with new object
    localStorage.setItem('notes', JSON.stringify($scope.notelist));

  }, true);

});//end of controller
