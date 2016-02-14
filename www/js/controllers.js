angular.module('starter.controllers', ['idFactory', 'noteStorageFactory'])

//note list side bar
.controller('noteListCtrl', function($scope, $state, noteStorageFactory) {
  $scope.homeButtonHidden = false;
  //getting note object from local storage
  $scope.notelist = noteStorageFactory.setNoteObj();

  //home button available in nav-bar
  $scope.HomeButton = function () {
    $state.go('app.main', {url: '#/app/main/'});
  }

})//end of controller


//main section for adding notes.
.controller('mainCtrl', function($scope, $state, idFactory, noteStorageFactory){
  $scope.homeButtonHidden = true;
  //getting note object from local storage. It will be empty object if no notes are added.
  $scope.noteObject = noteStorageFactory.setNoteObj();

  //creating a new note with deafult keys
  $scope.NewNote = function () {
    //getting a unique id
    var noteid = idFactory.setId();

    $scope.notelist[noteid] = {
      title: 'Untitled',
      content: '...'
      }

    //setting note object in local storage.
    localStorage.setItem('notes', JSON.stringify($scope.notelist));

    //loading new note partial and storing noteid in $stateParams (view app.js app.single)
    $state.go('app.single', {url: '#/app/note/', notelistId: noteid});
  }
})//end of controller


//single note text area
.controller('noteCtrl', function($scope, $stateParams, noteStorageFactory) {
    $scope.homeButtonHidden = false;
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
