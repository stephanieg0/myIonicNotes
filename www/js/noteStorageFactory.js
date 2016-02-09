angular.module('noteStorageFactory', []).factory('noteStorageFactory', [function(){

  var noteObject = "";

  return {
    //setting an empty object to fill later. This is not going to local storage yet.
    setNoteObj: function () {
      //console.log("this is note factory");

      noteObject = JSON.parse(localStorage.getItem("notes")) || {};

      return noteObject;
    }

  }//end of return
}]);//end of factory
