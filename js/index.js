const form = document.querySelector('#form');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let id = localStorage.getItem('id') || 1;
const inputTask = document.querySelector('#task');
const divTasks = document.querySelector('#tasks');

form.addEventListener('submit', e => {
  e.preventDefault();

  const task = Object.create(null);
  task.id = Number(id);
  task.task = e.target.task.value;
  task.status = 'pending';

  id++;

  saveTask(task);
});

const saveTask = task => {
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('id', id);

  inputTask.value = '';
  loadTasks();
}

const loadTasks = () => {
  const thereArePendingTasks = tasks.some(task => task.status === 'pending');
  if (tasks.length === 0 || !thereArePendingTasks) {
    divTasks.textContent = '- Sem tarefas pendentes -';
  } else {
    divTasks.textContent = '';

    tasks.map(task => {
      if (task.status === 'pending') {
        const divTask = document.createElement('div');
        const taskDesc = document.createElement('div');
        const done = document.createElement('div');
  
        divTask.classList.add('task');
        taskDesc.classList.add('task-desc');
        done.classList.add('done');
  
        taskDesc.textContent = task.task;

        done.setAttribute('onclick', `remove(${task.id})`);
  
        divTask.append(taskDesc, done);
        divTasks.append(divTask);
      }
    });
  }
}

loadTasks();

const remove = id => {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.status = 'completed';
    }

    return task;
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

  loadTasks();
}