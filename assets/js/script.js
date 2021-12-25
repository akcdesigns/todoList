let taskView = document.querySelector('[data-task-view]');
let addNewTaskButton = document.querySelector('[data-add-new-task-button]');
let addTaskSection = document.getElementById('addTask');
let addForm = document.getElementById('addTaskForm');
let addTodoButton = document.getElementById('addTodoButton');
let taskInput = document.getElementById('taskInput');
let incompleteNum = document.getElementById('incompleteNum');
let tasks;

// Event listeners

// Checking for click outside add section
document.addEventListener('click', function (event) {
  if (addTaskSection.style.display === 'none') return;
  let isClickInsideElement = addTaskSection.contains(event.target);
  let isClickInsideElementTwo = addNewTaskButton.contains(event.target)
  if (!isClickInsideElement && !isClickInsideElementTwo) {
    addTaskSection.style.display = 'none';
  }
});

// Adding task to list
addTodoButton.addEventListener('click', e => {
  e.preventDefault();
  // clearing task viewa
  taskView.innerText = "";
  // adding task to array
  if (!taskInput.value) return displayTodos();
  tasks.push({ task: taskInput.value, completed: false });
  displayTodos()
})

// Initial display of tasks on load  
window.addEventListener('DOMContentLoaded', () => {

  if (localStorage.getItem("todo-arraylist")) {
    let retrievedData = localStorage.getItem("todo-arraylist");
    tasks = JSON.parse(retrievedData);
  } else {
    tasks = [];
  }

  displayTodos();
});

// Opening input for new task
addNewTaskButton.addEventListener('click', () => {
  addTaskSection.style.display = 'block';
})

// Functions
const displayTodos = () => {

  localStorage.setItem("todo-arraylist", JSON.stringify(tasks));

  let numCompleted = 0;
  taskView.innerText = ""

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) {
      numCompleted++
    };
    let todo = document.createElement('div');
    if (tasks[i].completed) todo.className = 'tasks completed';
    else todo.className = 'tasks';
    let todoP = document.createElement('p');
    todoP.innerText = tasks[i].task;
    let taskUpdDel = document.createElement('div');
    taskUpdDel.className = 'task-update-delete';
    let taskUpdate = document.createElement('div');
    taskUpdate.className = 'update';
    let taskDelete = document.createElement('div');
    taskDelete.className = 'delete';
    let updateAnchor = document.createElement('a');
    updateAnchor.href = '#';
    let updateIcon = document.createElement('i');
    updateIcon.className = 'fas fa-check';
    updateIcon.id = i
    let deleteAnchor = document.createElement('a');
    deleteAnchor.href = '#';
    let deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-times-circle';
    deleteIcon.dataset.indexNumber = i;

    deleteIcon.addEventListener('click', deleteTaskFunction)
    updateIcon.addEventListener('click', markAsComplete)

    todo.appendChild(todoP);
    todo.appendChild(taskUpdDel);
    taskUpdDel.appendChild(taskUpdate);
    taskUpdate.appendChild(updateAnchor);
    updateAnchor.appendChild(updateIcon);
    taskUpdDel.appendChild(taskDelete);
    taskDelete.appendChild(deleteAnchor);
    deleteAnchor.appendChild(deleteIcon);

    taskView.appendChild(todo);
    addTaskSection.style.display = 'none';
    taskInput.value = "";

  }

  incompleteNum.innerText = tasks.length - numCompleted;

}

const deleteTaskFunction = e => {
  let deleteTask = e.target.dataset.indexNumber;
  tasks.splice(deleteTask - 1, 1);
  displayTodos();
}

const markAsComplete = e => {
  let todo = e.target.id;
  todo = parseInt(todo);
  tasks[todo].completed = true;
  displayTodos();
}