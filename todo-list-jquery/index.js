const tasks = [];

function addTask() {
  const newTask = $('#new-task').val();
  if (newTask.trim() !== '') {
    tasks.push({ text: newTask, completed: false });
    renderTasks();
    $('#new-task').val('');
  }
}

function renderTasks() {
  $('#todo-list').empty();
  tasks.forEach((task, index) => {
    const listItem = $(`<li class="todo-item" data-index="${index}"></li>`);
    const taskText = $('<span class="task-text"></span>').text(task.text);
    const buttonsContainer = $('<div class="task-buttons"></div>');
    
    const deleteButton = $('<button class="delete-btn">❌</button>');
    const editButton = $('<button class="edit-btn">✏️</button>');
    
    buttonsContainer.append(editButton, deleteButton);
    listItem.append(taskText, buttonsContainer);
    
    if (task.completed) {
      listItem.addClass('completed');
    }
    
    $('#todo-list').append(listItem);
  });
}

$('form').on('submit', function (e) {
  e.preventDefault();
  addTask();
});

$(document).on('click', '.task-text', function() {
  const listItem = $(this).closest('.todo-item');
  const index = listItem.data('index');
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
});

$(document).on('click', '.delete-btn', function(e) {
  e.stopPropagation();
  const listItem = $(this).closest('.todo-item');
  const index = listItem.data('index');
  tasks.splice(index, 1);
  renderTasks();
});

$(document).on('click', '.edit-btn', function(e) {
  e.stopPropagation();
  const listItem = $(this).closest('.todo-item');
  const index = listItem.data('index');
  const currentText = tasks[index].text;
  
  const newText = prompt('Введите новое название задачи:', currentText);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    renderTasks();
  }
});