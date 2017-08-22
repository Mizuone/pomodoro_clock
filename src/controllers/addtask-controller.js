(function() {
  angular.module('pomodoro').controller('addtask', ['$scope', function($scope) {
    //each day will have a different color
    $scope.taskName = '';
    $scope.taskDescription = '';
    $scope.timeEstimate = '';
  }]).directive('task', function() {
    return {
      templateUrl: './src/directives/task-directive.html'
    }
  });
})();
