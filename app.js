const addButton = document.querySelector(".add-btn");
const inputValue = document.querySelector(".input-value");
const listUl = document.querySelector(".list-tasks");
const checkBox = document.querySelector(".task");
const form = document.querySelector(".form-select");

const addTask = (event) => {
  event.preventDefault();
  if (inputValue.value === "") {
    document.querySelector(".alert").classList.remove("hidden");

    setTimeout(() => {
      document.querySelector(".alert").classList.add("hidden");
    }, 3000);

    return;
  }
  const newTasksLi = document.createElement("li");

  const newTaskText = document.createElement("p");
  newTaskText.classList.add("task-text");

  newTasksLi.appendChild(newTaskText);

  const rightButtons = document.createElement("div");
  rightButtons.classList.add("right-btns");

  newTasksLi.appendChild(rightButtons);

  rightButtons.innerHTML = `<input type="checkbox" class="task">
    <button class="delete-btn">Delete</button>`;

  newTaskText.innerText = inputValue.value;
  listUl.appendChild(newTasksLi);
  
  if (form.value == "very-important") {
    newTasksLi.style.backgroundColor = "#dc3545";
  } else if (form.value == "important") {
    newTasksLi.style.backgroundColor = "#ffc107";
  } else if (form.value == "not-important") {
    newTasksLi.style.backgroundColor = "#28a745";
  }

  const object = {
    task: inputValue.value,
    complete: false,
    importance: form.value,
  };

  saveLocalTodos(object);

  inputValue.value = "";
};


const deleteTask = (e) => {
  const item = e.target;
  if (item.classList.contains("delete-btn")) {
    const todo = item.parentElement.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList.contains("task")) {
    item.parentElement.parentElement.classList.toggle("complete");
    checkLocalTodos(item.parentElement.parentElement);
  }
};

const getTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const newTasksLi = document.createElement("li");

    const newTaskText = document.createElement("p");
    newTaskText.classList.add("task-text");

    newTasksLi.appendChild(newTaskText);

    const rightButtons = document.createElement("div");
    rightButtons.classList.add("right-btns");

    newTasksLi.appendChild(rightButtons);

    rightButtons.innerHTML = `<input type="checkbox" class="task">
    <button class="delete-btn">Delete</button>`;

    newTaskText.innerText = todo.task;

    if (todo.complete == true) {
      newTasksLi.classList.add("complete");
      newTasksLi.children[1].children[0].checked = true;
    }

    if(todo.importance == "very-important"){
      newTasksLi.style.backgroundColor = "#dc3545";
    }
    else if(todo.importance == "important"){
      newTasksLi.style.backgroundColor = "#ffc107";
    }
    else if(todo.importance == "not-important"){
      newTasksLi.style.backgroundColor = "#28a745";
    } 
    

    listUl.appendChild(newTasksLi);
  });
};

const removeLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  const index = todos.findIndex((x) => x.task === todoIndex);
  console.log(index);
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const checkLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.forEach(function (todo) {
    if (todo.task == todoIndex) {
      if (todo.complete == true) {
        todo.complete = false;
      } else {
        todo.complete = true;
      }
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
};

const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

addButton.addEventListener("click", addTask);
listUl.addEventListener("click", deleteTask);
document.addEventListener("DOMContentLoaded", getTodos);
