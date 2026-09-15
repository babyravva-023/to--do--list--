let tasks = [];
let taskIdCounter = 1;

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text === '') return;

  tasks.push({ id: taskIdCounter++, text: text, completed: false });
  input.value = '';
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

function render() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  if (tasks.length === 0) {
    list.innerHTML = '<li class="empty-msg">No tasks yet. Add one above!</li>';
  } else {
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.completed ? ' completed' : '');
      li.innerHTML = `
        <div class="task-left">
          <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})" />
          <span class="task-text">${escapeHtml(task.text)}</span>
        </div>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      `;
      list.appendChild(li);
    });
  }

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;

  document.getElementById('totalCount').textContent = total;
  document.getElementById('completedCount').textContent = completed;
  document.getElementById('remainingCount').textContent = remaining;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

document.getElementById('taskInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

render();