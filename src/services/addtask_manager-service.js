(function() {
  angular.module('pomodoro').service('addtask_manager', function() {
    return {
      addTask: function(taskName, taskDescription, timeEstimate, taskDay) {
          return {taskName: taskName, taskDescription: taskDescription, timeEstimate: timeEstimate, taskDay: taskDay};
      },
      appendTask: function(taskArr, container) {

      }
    };
  });
})();
