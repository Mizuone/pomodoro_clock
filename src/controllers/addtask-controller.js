(function() {
  angular.module('pomodoro').controller('addtask', ['$scope', 'addtask_manager', 'localstorage_manager', '$window', function($scope, addtask_manager, localstorage_manager, $window) {
    $scope.taskName = '';
    $scope.taskDescription = '';
    $scope.timeEstimate = '';
    $scope.daysObj = [{day: 'Monday'},{day: 'Tuesday'},{day: 'Wednesday'},{day: 'Thursday'},{day: 'Friday'},{day: 'Saturday'},{day: 'Sunday'}];
    $scope.taskDay = $scope.daysObj[0].day;

    $scope.editTask = function(taskName, taskDescription, timeEstimate, taskDay) {
      taskDay = taskDay.toLowerCase();

      var localStorageName = 'pomodoro_weeklytasks' + taskDay + '';
          getTaskStorage = localstorage_manager.getStorage(localStorageName),
          taskMenuId = parseInt(document.getElementsByClassName('task-edit-menu')[0].getAttribute('data-task-id'));

      for (var i = 0, len = getTaskStorage.length; i < len; i++) {

        if (i === taskMenuId) {
          getTaskStorage[i].taskName = taskName;
          getTaskStorage[i].taskDescription = taskDescription;
          getTaskStorage[i].taskDay = taskDay;
          getTaskStorage[i].timeEstimate = timeEstimate;
        }

      }

      localstorage_manager.setStorage(localStorageName, getTaskStorage);

      closeTaskLightBox();

      $window.location.reload();

    };

    $scope.addTask = function(taskName, taskDescription, timeEstimate, taskDay) {

      taskDay = taskDay.toLowerCase();

      var taskObj = addtask_manager.addTask(taskName, taskDescription, timeEstimate, taskDay),
          tasksFromLocal = localstorage_manager.getStorage('pomodoro_weeklytasks' + taskDay.toLowerCase());

      tasksFromLocal.push(taskObj);

      localstorage_manager.setStorage('pomodoro_weeklytasks' + taskDay, tasksFromLocal);

      closeTaskLightBox();

      $window.location.reload();
    };


    function closeTaskLightBox() {
      var getTasksOverlay = document.getElementsByClassName('addtask-overlay')[0];

      getTasksOverlay.style.display = 'none';
    }


  }]).directive('task', function() {
    return {
      templateUrl: './src/directives/task-directive.html',
      controller: 'addtask'
    }
  });
})();
