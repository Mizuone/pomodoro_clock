(function() {
  angular.module('pomodoro').controller('dashboard-weekly', ['$scope', 'localstorage_manager', '$window', function($scope, localstorage_manager, $window) {

    var getTasksOverlay = document.getElementsByClassName('addtask-overlay')[0],
        getTasksContainer = document.getElementsByClassName('addtask-container')[0];

        console.log($scope.taskArrMonday);

        $scope.taskArrMonday = setTaskArr('pomodoro_weeklytasksmonday');
        $scope.taskArrTuesday = setTaskArr('pomodoro_weeklytaskstuesday');
        $scope.taskArrWednesday = setTaskArr('pomodoro_weeklytaskswednesday');
        $scope.taskArrThursday = setTaskArr('pomodoro_weeklytasksthursday');
        $scope.taskArrFriday = setTaskArr('pomodoro_weeklytasksfriday');
        $scope.taskArrSaturday = setTaskArr('pomodoro_weeklytaskssaturday');
        $scope.taskArrSunday = setTaskArr('pomodoro_weeklytaskssunday');

        $scope.$watchGroup(['taskArrMonday', 'taskArrTuesday', 'taskArrWednesday', 'taskArrThursday', 'taskArrFriday', 'taskArrSaturday', 'taskArrSunday'], function(newVal, oldVal, scope) {
          console.log(newVal);
        });

    function setTaskArr(localStorageName) {

      if (localstorage_manager.getStorage(localStorageName) !== undefined) {
        return localstorage_manager.getStorage(localStorageName);
      } else {
        localstorage_manager.setStorage(localStorageName, []);
        return [];
      }

    }

    document.getElementsByTagName('body')[0].addEventListener('click', dashBoardWeeklyTasksEvents);

    function getTaskMenu() {
      return document.querySelector('.task-edit-menu');
    }

    function noDuplicateTask(id) {
      var taskMenu = getTaskMenu();

      if (taskMenu.getAttribute('data-task-id') !== id) {
        return true;
      }

      return false;
    }

    function removeCurrentTaskMenu() {
      var taskMenu = getTaskMenu();

      if (taskMenu === null) {
        return;
      }

      getTaskMenu().remove();
    }

    function createTaskMenu(event, taskId, day) {

      if (getTaskMenu() === null || noDuplicateTask()) {
        removeCurrentTaskMenu();

        var div = document.createElement('div'),
        getBodyElement = document.getElementsByTagName('body')[0];

        div.className = 'task-edit-menu '+ day +'';
        div.setAttribute('data-task-id', taskId);
        getBodyElement.style.position = 'relative';
        getBodyElement.appendChild(div);

        var taskMenu = document.querySelector('.task-edit-menu');

        taskMenu.style.position = 'absolute';
        taskMenu.style.top = event.clientY + 'px';
        taskMenu.style.left = event.clientX + 'px';
        taskMenu.innerHTML = '<p class="task-edit-choice task-edit"><span><i class="fa fa-pencil-square-o float-left" aria-hidden="true"></i></span>Edit Task </p> <p class="task-edit-choice task-delete"> <span><i class="fa fa-trash-o float-left" aria-hidden="true"></i></span> Delete Task</p>';

        document.getElementsByClassName('task-delete')[0].addEventListener('click', deleteTask);
        document.getElementsByClassName('task-edit')[0].addEventListener('click', editTask);

      }

    }

    function removeBlankTasks() {
      var localStorageArr = [];
    }

    function editTask() {
      $scope.showAddTask();

      //display edit button

      var taskNameField = document.getElementById('addtask-taskname'),
          taskDescriptionField = document.getElementById('addtask-taskdescription'),
          taskDayField = document.getElementById('addtask-taskday'),
          taskTimeEstimateField = document.getElementById('addtask-timeestimate'),
          taskMenu = getTaskMenu(),
          taskId = parseInt(taskMenu.getAttribute('data-task-id')),
          taskDay = taskMenu.className.split(' ').pop(),
          getTaskStorage = localstorage_manager.getStorage('pomodoro_weeklytasks'+ taskDay +'');

      for (var i = 0, len = getTaskStorage.length; i < len; i++) {

        if (i === taskId) {
            taskNameField.value = getTaskStorage[i].taskName;
            taskDescriptionField.value = getTaskStorage[i].taskDescription;
            taskDayField.value = getTaskStorage[i].taskDay;
            taskTimeEstimateField.value = getTaskStorage[i].timeEstimate;
        }

      }


      //populate each field with the information of the task that was clicked
    }

    function deleteTask() {
      var taskMenu = getTaskMenu(),
          taskId = taskMenu.getAttribute('data-task-id'),
          taskDay = taskMenu.className.split(' ').pop(),
          taskDayContainer = document.querySelector('.tasks-'+ taskDay +''),
          taskDayChild = taskDayContainer.getElementsByClassName(taskDay);

          console.log(taskDayChild);

      for (var i = 0, len = taskDayChild.length; i < len; i++) {

        if (taskDayChild[i].getAttribute('data-task-id') === taskId) {

          removeCurrentTaskMenu();
          removeTaskFromLocal('pomodoro_weeklytasks'+ taskDay +'', i);
          taskDayChild[i].remove();

          break;
        }

      }

    }

    function removeTaskFromLocal(key, index) {
      var getLocalStorage = localstorage_manager.getStorage(key);

      getLocalStorage.splice(index, 1);

      localstorage_manager.setStorage(key, getLocalStorage);
    }

    function dashBoardWeeklyTasksEvents(event) {
      var target = event.target,
          dayArr = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          parentNodeClasses = target.parentNode.classList,
          targetNodeClass = target.classList;

      if (parentNodeClasses.contains('task-edit-menu')) {
        return false;
      }

      if (!parentNodeClasses.contains('task-container') && !targetNodeClass.contains('task-container')) {
        removeCurrentTaskMenu();
        return false;
      }

      for (var i = 0, len = dayArr.length; i < len; i++) {

        var taskId = target.parentNode.getAttribute('data-task-id') === null ? target.getAttribute('data-task-id') : target.parentNode.getAttribute('data-task-id');

        if (parentNodeClasses.contains(dayArr[i]) && getTaskMenu() === null ||
            parentNodeClasses.contains(dayArr[i]) && getTaskMenu() !== null ||
            targetNodeClass.contains(dayArr[i]) && getTaskMenu() === null ||
            targetNodeClass.contains(dayArr[i]) && getTaskMenu() !== null) {

          createTaskMenu(event, taskId, dayArr[i]);
        }

      }

    }

    $scope.showAddTask = function() {

      getTasksOverlay.style.display = 'block';
      getTasksContainer.classList.add('fadeIn');

      document.getElementById('addtask-taskname').focus();
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

        }

      });

    }

  }]);

})();
