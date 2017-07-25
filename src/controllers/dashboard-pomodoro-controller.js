(function() {
  angular.module('pomodoro').controller('dashboard-pomodoro', ['$scope', 'localstorage_manager', function($scope, localstorage_manager) {

    if (localstorage_manager.getStorage('pomodoro_dashboardPomodoro') !== undefined) {

      initalizePomodoroStorage();

    } else {

      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          todaysDate = days[new Date().getDay()];

      localstorage_manager.setStorage('pomodoro_dashboardPomodoro', {totalPomodoros: 0, avgWeekPomodoro: 0, dayOfMostPomodoros: todaysDate});

      initalizePomodoroStorage();
    }

    function initalizePomodoroStorage() {
      var getPomodoroStorage = localstorage_manager.getStorage('pomodoro_dashboardPomodoro');

      $scope.totalPomodoros = getPomodoroStorage.totalPomodoros;
      $scope.avgWeekPomodoro = getPomodoroStorage.avgWeekPomodoro;
      $scope.dayOfMostPomodoros = getPomodoroStorage.dayOfMostPomodoros;
    }

  }]);
})();
