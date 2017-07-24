(function() {
  angular.module('pomodoro').controller('tasks', ['$scope', 'localstorage_manager', function($scope, localstorage_manager) {

      if (localstorage_manager.getStorage('pomodoro_tasks') !== undefined) {

        setStorageForTasks();

      } else {

        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            todaysDate = days[new Date().getDay()];

        localstorage_manager.setStorage('pomodoro_tasks', {tasksCompleted: 0, avgTasksWeek: 0, dayOfMostTask: todaysDate, projectMostTasks: 'No Project Found'});

        setStorageForTasks();

      }

      function setStorageForTasks(identifier) {
        var getPomodoroTasks = localstorage_manager.getStorage('pomodoro_tasks');

        $scope.tasksCompleted = getPomodoroTasks.tasksCompleted;
        $scope.avgTasksWeek = getPomodoroTasks.avgTasksWeek;
        $scope.dayOfMostTask = getPomodoroTasks.dayOfMostTask;
        $scope.projectMostTasks = getPomodoroTasks.projectMostTasks;
      }

  }]);
})();
