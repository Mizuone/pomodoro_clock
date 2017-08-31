(function() {
  angular.module('pomodoro').controller('dashboard-weekly', function($scope) {

    var getTasksOverlay = document.getElementsByClassName('addtask-overlay')[0],
        getTasksContainer = document.getElementsByClassName('addtask-container')[0];


<<<<<<< HEAD
<<<<<<< HEAD
    $scope.addTask = function() {

      getTasksOverlay.style.display = 'block';
      getTasksContainer.classList.add('fadeIn');

      removeTaskContainerListener();

=======
    $scope.showAddTask = function() {

      getTasksOverlay.style.display = 'block';
      getTasksContainer.classList.add('fadeIn');

      removeTaskContainerListener();

>>>>>>> development
=======
    $scope.showAddTask = function() {

      getTasksOverlay.style.display = 'block';
      getTasksContainer.classList.add('fadeIn');

      removeTaskContainerListener();

>>>>>>> development
    };

    function removeTaskContainerListener() {

      getTasksOverlay.addEventListener('click', function() {
        event.stopPropagation();

        var targetParent = event.target.parentNode;

        if (event.target.classList.contains('addtask-overlay') &&
            !targetParent.classList.contains('addtask-container') &&
            !targetParent.parentNode.classList.contains('addtask-container')) {

          this.style.display = 'none';
<<<<<<< HEAD
<<<<<<< HEAD
=======
          document.querySelector('.md-select-menu-container.md-active.md-clickable').style.display = 'none';
>>>>>>> development
=======
          document.querySelector('.md-select-menu-container.md-active.md-clickable').style.display = 'none';
>>>>>>> development
        }

      });

    }



  });
})();
