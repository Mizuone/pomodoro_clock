(function() {
  angular.module('pomodoro').controller('dashboard-weekly', function($scope) {

    var getTasksOverlay = document.getElementsByClassName('addtask-overlay')[0],
        getTasksContainer = document.getElementsByClassName('addtask-container')[0];


    $scope.showAddTask = function() {

      getTasksOverlay.style.display = 'block';
      getTasksContainer.classList.add('fadeIn');

      removeTaskContainerListener();

    };

    function removeTaskContainerListener() {

      getTasksOverlay.addEventListener('click', function() {
        event.stopPropagation();

        var targetParent = event.target.parentNode;

        if (event.target.classList.contains('addtask-overlay') &&
            !targetParent.classList.contains('addtask-container') &&
            !targetParent.parentNode.classList.contains('addtask-container')) {

          this.style.display = 'none';
          document.querySelector('.md-select-menu-container.md-active.md-clickable').style.display = 'none';
        }

      });

    }



  });
})();
