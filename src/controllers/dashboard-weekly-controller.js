(function() {
  angular.module('pomodoro').controller('dashboard-weekly', ['$scope', 'localstorage_manager', '$window','set_variable', 'addtask_manager', function($scope, localstorage_manager, $window, set_variable, addtask_manager) {

    var getTasksOverlay = document.getElementsByClassName('addtask-overlay')[0],
        getTasksContainer = document.getElementsByClassName('addtask-container')[0];

        $scope.taskName = '';
        $scope.taskDescription = '';
        $scope.timeEstimate = '';
        $scope.taskNameDefault = '';
        $scope.taskDescriptionDefault = '';
        $scope.timeEstimateDefault = '';
        $scope.daysObj = [{day: 'Monday'},{day: 'Tuesday'},{day: 'Wednesday'},{day: 'Thursday'},{day: 'Friday'},{day: 'Saturday'},{day: 'Sunday'}];
        $scope.taskDay = set_variable.getTaskDay();
        displayWeeklyTasks();

        function clearWeeklyTask(taskId, taskDay) {
          var localStorageName = 'pomodoro_weeklytasks' + taskDay + ''
              getWeeklyTasks = localstorage_manager.getStorage(localStorageName);

          getWeeklyTasks.splice(taskId, 1);

          localstorage_manager.setStorage(localStorageName, getWeeklyTasks);
        }


        $scope.editTask = function(taskDay) {
          taskDay = taskDay.toLowerCase();

          var editTaskDay = getTaskMenu(),
              taskMenuId = parseInt(document.getElementsByClassName('task-edit-menu')[0].getAttribute('data-task-id'));

          if (taskDay !== editTaskDay.classList[1]) {

            clearWeeklyTask(taskMenuId, editTaskDay.classList[1]);
            $scope.addTask(getTaskNameFieldValue(), getTaskDescriptionFieldValue(), getTimeEstimateField(), taskDay);
            removeCurrentTaskMenu();
            return false;

          }

          var localStorageName = 'pomodoro_weeklytasks' + taskDay + '',
              getTaskStorage = localstorage_manager.getStorage(localStorageName);

              getTaskStorage[taskMenuId].taskName = getTaskNameFieldValue();
              getTaskStorage[taskMenuId].taskDescription = getTaskDescriptionFieldValue();
              getTaskStorage[taskMenuId].taskDay = taskDay;
              getTaskStorage[taskMenuId].timeEstimate = getTimeEstimateField();

              localstorage_manager.setStorage(localStorageName, getTaskStorage);


          clearTaskFields();
          displayWeeklyTasks();
          removeCurrentTaskMenu();
          closeTaskLightBox();

        };


        $scope.addTask = function(taskName, taskDescription, timeEstimate, taskDay) {

          taskDay = taskDay.toLowerCase();

          var taskObj = addtask_manager.addTask(taskName, taskDescription, timeEstimate, taskDay),
              tasksFromLocal = localstorage_manager.getStorage('pomodoro_weeklytasks' + taskDay.toLowerCase());

          tasksFromLocal.push(taskObj);

          localstorage_manager.setStorage('pomodoro_weeklytasks' + taskDay, tasksFromLocal);

          clearTaskFields();
          displayWeeklyTasks();

          closeTaskLightBox();

        };



        function clearTaskFields() {
          $scope.taskName = '';
          $scope.taskDescription = '';
          $scope.timeEstimate = '';
          $scope.taskDay = '';
        }

        function displayWeeklyTasks() {
          $scope.taskArrMonday = setTaskArr('pomodoro_weeklytasksmonday');
          $scope.taskArrTuesday = setTaskArr('pomodoro_weeklytaskstuesday');
          $scope.taskArrWednesday = setTaskArr('pomodoro_weeklytaskswednesday');
          $scope.taskArrThursday = setTaskArr('pomodoro_weeklytasksthursday');
          $scope.taskArrFriday = setTaskArr('pomodoro_weeklytasksfriday');
          $scope.taskArrSaturday = setTaskArr('pomodoro_weeklytaskssaturday');
          $scope.taskArrSunday = setTaskArr('pomodoro_weeklytaskssunday');
        }


        function closeTaskLightBox() {
          var getTasksOverlay = document.getElementsByClassName('addtask-overlay')[0];

          getTasksOverlay.style.display = 'none';
        }



    function setTaskArr(localStorageName) {

      if (localstorage_manager.getStorage(localStorageName) !== undefined) {
        return localstorage_manager.getStorage(localStorageName);
      } else {
        localstorage_manager.setStorage(localStorageName, []);
        return [];
      }

    }

    document.getElementsByTagName('body')[0].addEventListener('click', dashBoardWeeklyTasksEvents, false);

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

        document.getElementsByClassName('task-delete')[0].addEventListener('click', deleteTask, false);
        document.getElementsByClassName('task-edit')[0].addEventListener('click', editTask, false);

      }

    }

    function capitalize(str) {
    	return str.charAt(0).toUpperCase() + str.substring(1);
    }

    function removeBlankTasks() {
      var localStorageArr = [];
    }

    function getTaskNameFieldValue() {
      return document.getElementById('addtask-taskname').value;
    }
    function getTaskDescriptionFieldValue() {
      return document.getElementById('addtask-taskdescription').value;
    }
    function getTimeEstimateField() {
      return document.getElementById('addtask-timeestimate').value;
    }

    function editTask(event) {
      event.stopPropagation();

      var taskNameField = document.getElementById('addtask-taskname'),
          taskDescriptionField = document.getElementById('addtask-taskdescription'),
          taskDayField = document.getElementById('addtask-taskday'),
          taskTimeEstimateField = document.getElementById('addtask-timeestimate'),
          taskNameClass = document.getElementsByClassName('taskname')[0],
          taskDescriptionClass = document.getElementsByClassName('taskdescription')[0],
          taskTimeEstimateClass = document.getElementsByClassName('timeestimate')[0],
          taskMenu = getTaskMenu(),
          taskId = parseInt(taskMenu.getAttribute('data-task-id')),
          taskDay = taskMenu.className.split(' ').pop(),
          getTaskStorage = localstorage_manager.getStorage('pomodoro_weeklytasks'+ taskDay +'');

      taskNameField.value = getTaskStorage[taskId].taskName;
      taskDescriptionField.value = getTaskStorage[taskId].taskDescription;
      taskTimeEstimateField.value = getTaskStorage[taskId].timeEstimate;

      // Check for not empty string in a field and appends a class to raise label on input box
      appendValueInInput(taskNameField, taskNameClass);
      appendValueInInput(taskDescriptionField, taskDescriptionClass);
      appendValueInInput(taskTimeEstimateField, taskTimeEstimateClass);

      toggleButton('addtask-button', true);
      toggleButton('edittask-button', false);
      showTaskMenu();

    }

    function appendValueInInput(parentContainer, childContainer) {

      removeClass(childContainer, 'md-input-has-value');

      if (parentContainer.value !== '') {
        childContainer.classList.add('md-input-has-value');
      }

    }

    function removeClass(container, classToRemove) {

        if (container.classList.contains(classToRemove)) {
            container.classList.remove(classToRemove);
        }

    }

    function toggleButton(container, hide) {
      var containerElement = document.getElementsByClassName(container)[0];

      if (hide && !containerElement.classList.contains('hide-container')) {
          containerElement.classList.add('hide-container');
          containerElement.classList.remove('show-container')
      }
      if (!hide && !containerElement.classList.contains('show-container')) {
          containerElement.classList.remove('hide-container');
          containerElement.classList.add('show-container')
      }

    }


    function deleteTask(event) {
      event.stopPropagation;

      var taskMenu = getTaskMenu(),
          taskId = taskMenu.getAttribute('data-task-id'),
          taskDay = taskMenu.className.split(' ').pop(),
          taskDayContainer = document.querySelector('.tasks-'+ taskDay +''),
          taskDayChild = taskDayContainer.getElementsByClassName(taskDay);

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

    function showTaskMenu() {
      getTasksOverlay.style.display = 'block';
      getTasksContainer.classList.add('fadeIn');

      document.getElementById('addtask-taskname').focus();
      removeTaskContainerListener();
    }


    $scope.showAddTask = function() {

      toggleButton('edittask-button', true);
      toggleButton('addtask-button', false);

      showTaskMenu();

    };

    function removeTaskContainerListener() {

      getTasksOverlay.addEventListener('click', function() {
        event.stopPropagation();

        var targetParent = event.target.parentNode;

        if (event.target.classList.contains('addtask-overlay') &&
            !targetParent.classList.contains('addtask-container') &&
            !targetParent.parentNode.classList.contains('addtask-container')) {

          removeCurrentTaskMenu();

          this.style.display = 'none';

        }

      });

    }

  }]).directive('task', function() {
    return {
      templateUrl: './src/directives/task-directive.html',
      controller: 'dashboard-weekly'
    }
  });

})();
