(function() {
  angular.module('pomodoro').controller('addtask', ['$scope', function($scope) {
    $scope.taskName = '';
    $scope.taskDescription = '';
    $scope.timeEstimate = '';
  }]);
})();
