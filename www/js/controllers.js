angular.module('starter.controllers', ['idFactory'])

//note list side bar
.controller('noteListCtrl', function($scope, $state) {
  $scope.homeButtonHidden = false;
  //getting note object from local storage
  $scope.notelist = JSON.parse(localStorage.getItem("notes")) || {};

  //deleting specific note with id and re-setting the local storage object
  $scope.deleteNote = function () {
    var noteId = event.target.id;
    delete $scope.notelist[noteId];
    localStorage.setItem('notes', JSON.stringify($scope.notelist));
  }

  //home button available in nav-bar
  $scope.HomeButton = function () {
    $state.go('app.main', {url: '#/app/main/'});
  }

})//end of controller


//main section for adding notes.
.controller('mainCtrl', function($scope, $state, idFactory){
  $scope.homeButtonHidden = true;
  //getting note object from local storage. It will be empty object if no notes are added.
  //$scope.noteObject = noteStorageFactory.setNoteObj();
  $scope.noteObject = JSON.parse(localStorage.getItem("notes")) || {};

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
.controller('noteCtrl', function($scope, $stateParams) {
    $scope.homeButtonHidden = false;
    //getting single note id from stateParams.
    $scope.noteid = $stateParams.notelistId;

    //getting entire note list obj to handpick id.
    $scope.notelist = JSON.parse(localStorage.getItem("notes")) || {};

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

  $scope.saveNote = function () {
    //setting storage with new object
    localStorage.setItem('notes', JSON.stringify($scope.notelist));
  }

});//end of controller
