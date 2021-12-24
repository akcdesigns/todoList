let taskView = document.querySelector('[data-task-view]');
let addNewTaskButton = document.querySelector('[data-add-new-task-button]');
let addTaskSection = document.getElementById('addTask');
let addForm = document.getElementById('addTaskForm');
let addTodoButton = document.getElementById('addTodoButton');
let taskInput = document.getElementById('taskInput');
let incompleteNum = document.getElementById('incompleteNum');
let numCompleted = 0;
let tasks = ['Send News Letters To Subscribers', 'Need To Create Spreadsheet Today', 'Fix The Bookshelf', 'Buy Some Apples'];

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

    tasks.push(taskInput.value);
    // looping array and displaying tasks
    incompleteNum.innerText = tasks.length - numCompleted;
    displayTodos()
})


// Initial display of tasks on load  
window.addEventListener('DOMContentLoaded', () => {
    incompleteNum.innerText = tasks.length
    displayTodos();
});

// Opening input for new task
addNewTaskButton.addEventListener('click', () => {
    addTaskSection.style.display = 'block';
})

// Functions
const displayTodos = () => {
    tasks.forEach(task => {

        let todo = document.createElement('div');
        todo.className = 'tasks';
        let todoP = document.createElement('p');
        todoP.innerText = task;
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
        let deleteAnchor = document.createElement('a');
        deleteAnchor.href = '#';
        let deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-times-circle';
        deleteIcon.id = `delete${Date.now()}`

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

    })
}

const deleteTaskFunction = e => {
    e.target.parentElement.parentElement.parentElement.parentElement.remove()
}

const markAsComplete = e => {
    e.target.parentElement.parentElement.parentElement.parentElement.className = 'completed';
    numCompleted++
    incompleteNum.innerText = tasks.length - numCompleted;
}