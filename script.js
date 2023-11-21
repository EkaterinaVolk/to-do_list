const input = document.getElementById('toDo__input');
const ul = document.getElementById('toDo__ul');
let tasks = [];

window.addEventListener('load', () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  for (let task of savedTasks) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const value = task;
  li.textContent = value;
  ul.append(li);
  li.prepend(checkbox);
  checkbox.type="checkbox";
  checkbox.classList.add("checkbox");
  tasks.push(task);
  }
  activateClearButton();
  showMessage();
});

function createTask() {
    const value = input.value;
    const li = document.createElement('li');
    const checkbox = document.createElement('input');

    if (value) {   
    li.textContent = value;
    tasks.push(value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    ul.append(li);
    li.prepend(checkbox);
    checkbox.type="checkbox";
    checkbox.classList.add("checkbox");
    input.value = '';
  } 
  showMessage();
  activateClearButton()
}

input.addEventListener("keyup", function (keyboardEvent) {
  if (keyboardEvent.key === 'Enter') {
    keyboardEvent.preventDefault();
    createTask();
  }
});

function clearTaskList() {
  const li = document.getElementsByTagName('li');
  let i = li.length -1;
  while (i >= 0) {
    li[i].remove();
    i--
  }
  tasks = [];
  localStorage.removeItem("tasks")
  showMessage();
  activateClearButton()
}

function showMessage() {
  const li = document.getElementsByTagName('li');
  const message = document.getElementById('message')
  if (li.length > 0) {
    message.style.display = 'none';
  } else {
    message.style.display = 'block';
  }
}

function activateClearButton() {
  const li = document.getElementsByTagName('li');
  const button = document.getElementById('toDo__button-clear');
  if (li.length > 0) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', 'disabled');
  }
}


document.getElementById('toDo__button').onclick = createTask;
document.getElementById('toDo__button-clear').onclick = clearTaskList;