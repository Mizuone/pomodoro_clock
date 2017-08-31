(function() {
  angular.module('pomodoro').controller('addtask', ['$scope', 'addtask_manager', 'localstorage_manager', function($scope, addtask_service, localstorage_manager) {
    //each day will have a different color
    $scope.taskName = '';
    $scope.taskDescription = '';
    $scope.timeEstimate = '';
    $scope.daysObj = [{day: 'Monday'},{day: 'Tuesday'},{day: 'Wednesday'},{day: 'Thursday'},{day: 'Friday'},{day: 'Saturday'},{day: 'Sunday'}];
    $scope.taskDay = $scope.daysObj[0].day;

    if (localstorage_manager.getStorage('pomodoro_weeklytasks') !== undefined) {

      var taskArr = localstorage_manager.getStorage('pomodoro_weeklytasks');

      $scope.taskArrMonday = retrieveByDay('monday', taskArr);
      $scope.taskArrTuesday = retrieveByDay('tuesday', taskArr);
      $scope.taskArrWednesday = retrieveByDay('wednesday', taskArr);
      $scope.taskArrThursday = retrieveByDay('thursday', taskArr);
      $scope.taskArrFriday = retrieveByDay('friday', taskArr);
      $scope.taskArrSaturday = retrieveByDay('saturday', taskArr);
      $scope.taskArrSunday = retrieveByDay('sunday', taskArr);
      //replace this as it adds to a service
    } else {
      localstorage_manager.setStorage('pomodoro_weeklytasks', []);
    }

    $scope.addTask = function(taskName, taskDescription, timeEstimate, taskDay, taskArr) {
      taskArr.push(addtask_manager.addTask(taskName, taskDescription, timeEstimate, taskDay));

      closeTaskLightBox();
    };


    function closeTaskLightBox() {
      var getTasksOverlay = document.getElementsByClassName('addtask-overlay')[0];

      document.querySelector('.md-select-menu-container.md-active.md-clickable').style.display = 'none';
    }

    function retrieveByDay(day, arr) {

      return dayArr = arr.forEach(function(element) {

        if (element[taskDay].toLowerCase() === day.toLowerCase()) {
          return element;
        }

      });

    }

  }]).directive('task', function() {
    return {
      templateUrl: './src/directives/task-directive.html',
      controller: 'addtask'
    }
  });
})();
