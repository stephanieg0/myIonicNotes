angular.module('idFactory', function () {

  var id = "";
  //Making ID
  return {
    setId: function () {

      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz_0123456789";

        for( var i=0; i < 20; i++ )
            id += possible.charAt(Math.floor(Math.random() * possible.length));
          console.log("id", id);
        return id;

    }

  }


});
