// selecting the elements
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list");

// event listener
btn.addEventListener("click", add);
list.addEventListener("click", deleted);
document.addEventListener("DOMContentLoaded", getData);

// functions
function add(event) {
  event.preventDefault();

  // creating main div for the li
  const container = document.createElement("div");
  container.classList.add("todos");

  //   creating li for each note
  const newNote = document.createElement("li");
  newNote.classList.add("list-note");
  newNote.innerText = input.value;
  container.appendChild(newNote);

  //   saving to localStorage
  saveData(input.value);
  // creating 2 buttons for the added notes
  //   completed button
  const done = document.createElement("button");
  done.innerText = "Completed";
  done.classList.add("note-done");
  container.appendChild(done);

  //   delete button

  const remove = document.createElement("button");
  remove.innerText = "Delete";
  remove.classList.add("note-delete");
  container.appendChild(remove);

  // append the container div to the ul
  list.appendChild(container);

  //  clear the input
  input.value = "";
}

// deleting the note
function deleted(event) {
  const one = event.target;
  if (one.classList[0] === "note-delete") {
    const todos = one.parentElement;
    todos.classList.add("clear");
    deleteData(todos);
    todos.addEventListener("transitionend", function () {
      todos.remove();
    });
  }
  if (one.classList[0] === "note-done") {
    const todos = one.parentElement;
    todos.classList.toggle("completed");
  }
}

// saving data to local storage
function saveData(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// get the data from the local storage
function getData() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const container = document.createElement("div");
    container.classList.add("todos");

    //   creating li for each note
    const newNote = document.createElement("li");
    newNote.classList.add("list-note");
    newNote.innerText = todo;
    container.appendChild(newNote);

    // creating 2 buttons for the added notes
    //   completed button
    const done = document.createElement("button");
    done.innerText = "Completed";
    done.classList.add("note-done");
    container.appendChild(done);

    //   delete button

    const remove = document.createElement("button");
    remove.innerText = "Delete";
    remove.classList.add("note-delete");
    container.appendChild(remove);

    // append the container div to the ul
    list.appendChild(container);
  });
}

// delete the data from the local storage
function deleteData(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const itemIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(itemIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
