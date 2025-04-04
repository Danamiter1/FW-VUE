const tasks = [];
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('new-task');
const todoList = document.getElementById('todo-list');

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const newTaskText = taskInput.value.trim();
  
  if (newTaskText) {
    tasks.push({
      text: newTaskText,
      completed: false
    });
    renderTasks();
    taskInput.value = '';
  }
});

function renderTasks() {
  todoList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (task.completed) {
      li.classList.add('completed');
    }
    
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'task-buttons';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = '✏️';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '❌';
    
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);
    
    li.appendChild(span);
    li.appendChild(buttonsDiv);
    
    todoList.appendChild(li);
    
    span.addEventListener('click', () => toggleComplete(index));
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      editTask(index);
    });
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(index);
    });
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt('Введите новое название задачи:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks();