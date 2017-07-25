(function() {
  angular.module('pomodoro').controller('subtasks', ['$scope', 'localstorage_manager', function($scope, localstorage_manager) {
    if (localstorage_manager.getStorage('pomodoro_subtasks') !== undefined) {

      initalizeSubTaskStorage();

    } else {
      localstorage_manager.setStorage('pomodoro_subtasks', {subTasksLeft: 0, subTasksCompleted: 0});

      initalizeSubTaskStorage();
    }

    function initalizeSubTaskStorage() {
      var getSubTaskStorage = localstorage_manager.getStorage('pomodoro_subtasks');

      $scope.subTasksLeft = getSubTaskStorage.subTasksLeft;
      $scope.subTasksCompleted = getSubTaskStorage.subTasksCompleted;
    }
  }]);
})();
