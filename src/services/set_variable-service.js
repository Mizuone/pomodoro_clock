(function() {
  angular.module('pomodoro').service('set_variable', function() {
      var taskDay = '';

      return {

        getTaskDay: function() {
          return taskDay;
        },
        setTaskDay: function(value) {
          taskDay = value;
        }

      };
  });
})();
