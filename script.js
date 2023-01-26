

// Create a Task object constructor
let Task = function(title, description, status) {
  this.title = title;
  this.description = description;
  this.status = status;
};
// Create a constructor for a TaskList object
let TaskList = function() {
  this.tasks = []; // assigns an empty array to the tasks property
};

// Add a method to the TaskList prototype to add a task
TaskList.prototype.addTask = function(task) {
  this.tasks.push(task);
};

// Add a method to the TaskList prototype to edit a task
TaskList.prototype.editTask = function(task, title, description, status) {
  task.title = title;
  task.description = description;
  task.status = status; // replaces the task's properties with the provided values
};

// Add a method to the TaskList prototype to delete a task
TaskList.prototype.deleteTask = function(task) {
  let taskIndex = this.tasks.indexOf(task);
  this.tasks.splice(taskIndex, 1); // removes the task from the tasks array
};

// Create a TaskController object constructor
let TaskController = function() {
// Method to handle user interactions
  this.handleUserInteraction = function(action, task, title, description, status) {
    switch (action) {
      case 'add':
        let newTask = new Task(title, description, status); // creates a new Task object
        taskList.addTask(newTask); // adds the new Task object to the tasks array
        break;
      case 'edit':
        taskList.editTask(task, title, description, status); // calls the editTask method on the taskList object, passing in the task, title, description and status arguments
        break;
      case 'delete':
        taskList.deleteTask(task); // calls the deleteTask method on the taskList object, passing in the task argument
        break;
    }
  };

// Method to update the user interface
  this.updateUI = function() {
    // Clear the task list
    let taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = ''; // sets the taskListElement's innerHTML to an empty string

    // Display the task list
    for (let i = 0; i < taskList.tasks.length; i++) {
      let task = taskList.tasks[i]; // assigns the current task to a variable
      let taskElement = document.createElement('div'); // creates a new div element
      taskElement.classList.add('task'); // adds the task class to the new div element

      // Task Title
      let titleElement = document.createElement('h3');
      titleElement.innerHTML = task.title; // sets the h3 element's innerHTML to the title property of the current task
      taskElement.appendChild(titleElement); // adds the h3 element to the div element

      // Task Description
      let descriptionElement = document.createElement('p');
      descriptionElement.innerHTML = task.description; // sets the p element's innerHTML to the description property of the current task
      taskElement.appendChild(descriptionElement); // adds the p element to the div element

      // Task Status
      let statusElement = document.createElement('span');
      statusElement.innerHTML = task.status; // sets the span element's innerHTML to the status property of the current task
      taskElement.appendChild(statusElement); // adds the span element to the div element

      // Task Controls
      let controlsElement = document.createElement('div');
      controlsElement.classList.add('controls'); // adds the controls class to the new div element

      // Edit Button
      let editButtonElement = document.createElement('button');
      editButtonElement.innerHTML = 'Edit'; // sets the edit button's innerHTML to 'Edit'
      editButtonElement.addEventListener('click', function() {
        // Show the edit form
        showEditForm(task);
      });
      controlsElement.appendChild(editButtonElement); // adds the edit button to the controls div element

      // Delete Button
      let deleteButtonElement = document.createElement('button');
      deleteButtonElement.innerHTML = 'Delete'; // sets the delete button's innerHTML to 'Delete'
      deleteButtonElement.addEventListener('click', function() {
        // Delete the task
        taskController.handleUserInteraction('delete', task); // calls the handleUserInteraction method, passing in the action of 'delete' and the current task

        // Update the UI
        taskController.updateUI(); // calls the updateUI method to update the UI
      });
      controlsElement.appendChild(deleteButtonElement); // adds the delete button to the controls div element

      taskElement.appendChild(controlsElement); // adds the controls div to the task div element

      taskListElement.appendChild(taskElement); // adds the task div to the taskListElement
    }
  };

  // Method to show the edit form
  let showEditForm = function(task) {
    document.getElementById('edit-title').value = task.title; // sets the edit title's value to the title property of the current task
    document.getElementById('edit-description').value = task.description; // sets the edit description's value to the description property of the current task
    document.getElementById('edit-status').value = task.status; // sets the edit status's value to the status property of the current task

    let saveButton = document.getElementById('save-button');
    saveButton.dataset.taskId = taskList.tasks.indexOf(task); // sets the taskId of the save button to the index of the current task in the tasks array
    saveButton.style.display = 'inline-block'; // displays the save button
  };

}

// Create instances of the TaskList and TaskController objects
let taskList = new TaskList();
let taskController = new TaskController();

// Add event listener to the add task form
let addTaskForm = document.getElementById('add-task-form');
addTaskForm.addEventListener('submit', function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get form data
  let title = document.getElementById('title').value; // assigns the title value to a variable
  let description = document.getElementById('description').value; // assigns the description value to a variable
  let status = document.getElementById('status').value; // assigns the status value to a variable

  // Handle user interaction
  taskController.handleUserInteraction('add', null, title, description, status); // calls the handleUserInteraction method, passing in the action of 'add', a null task, and the title, description and status variables

  // Reset form
  document.getElementById('add-task-form').reset(); // resets the add task form

  // Update the UI
  taskController.updateUI(); // calls the updateUI method to update the UI
});

// Add event listener to the edit task form
let editTaskForm = document.getElementById('edit-task-form');
editTaskForm.addEventListener('submit', function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get form data
  let title = document.getElementById('edit-title').value; // assigns the edit title value to a variable
  let description = document.getElementById('edit-description').value; // assigns the edit description value to a variable
  let status = document.getElementById('edit-status').value; // assigns the edit status value to a variable
  let taskId = document.getElementById('save-button').dataset.taskId; // assigns the taskId of the save button to a variable

  // Handle user interaction
  let task = taskList.tasks[taskId]; // assigns the task at the taskId to a variable
  taskController.handleUserInteraction('edit', task, title, description, status); // calls the handleUserInteraction method, passing in the action of 'edit', the task variable, and the title, description and status variables

  // Reset form
  document.getElementById('edit-task-form').reset(); // resets the edit task form
  document.getElementById('save-button').style.display = 'none'; // hides the save button

  // Update the UI
  taskController.updateUI(); // calls the updateUI method to update the UI
});

// Update the UI when the page is loaded
window.onload = function() {
  taskController.updateUI(); // calls the updateUI method to update the UI
};
