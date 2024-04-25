document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Retrieve tasks from local storage if any
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to display tasks
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
                <button class="delete" data-index="${index}">Delete</button>
                <button class="complete" data-index="${index}">${task.completed ? 'Undo' : 'Complete'}</button>
            `;
            taskList.appendChild(li);
        });
        saveTasks();
    }

    // Event listener for adding a task
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskInput = document.getElementById('task').value.trim();
        if (taskInput !== '') {
            tasks.push({ name: taskInput, completed: false });
            displayTasks();
            taskForm.reset();
        }
    });

    // Event delegation for deleting and completing tasks
    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            displayTasks();
        }
        if (e.target.classList.contains('complete')) {
            const index = e.target.dataset.index;
            tasks[index].completed = !tasks[index].completed;
            displayTasks();
        }
    });

    // Initial display of tasks
    displayTasks();
});
