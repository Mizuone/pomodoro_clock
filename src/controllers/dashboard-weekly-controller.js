(function() {
  angular.module('pomodoro').controller('dashboard-weekly', function($scope) {

    $scope.addTask = function() {
      var getTasksContainer = document.getElementsByClassName('addtask-overlay')[0];

      getTasksContainer.style.display = 'block';
    };

  });
})();
