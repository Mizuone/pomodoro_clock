(function() {

  angular.module('pomodoro').service('localstorage_manager', function() {

    return {

      getStorage: function(key) {

        if (key === undefined) {
            return undefined;
        }

        for (var i = 0, len = localStorage.length; i < len; i++) {

          if (localStorage.key(i) === key) {
            return JSON.parse(localStorage.getItem(key));
          }

        }

      },

      parseStorage: function(key) {
        var storageItem = getStorage(key);

        if (key !== undefined) {
          return JSON.parse(key);
        }

      },

      setStorage: function(key, contents) {

        //if (!localStorage.getItem(key)) {
          localStorage.setItem(key, JSON.stringify(contents));
        /*} else {
          console.log('Identical Key Found', key);
        }*/

      }

    }

  });

})();
