let input = document.querySelector(".input input");

let add = document.querySelector(".input i");

let things = document.querySelector(".things");

let thingsArr = [];

if (localStorage.getItem("task")) {
  thingsArr = JSON.parse(localStorage.getItem("task"));
}

getFromLocalStorage();

add.onclick = function () {
  if (input.value !== "") {
    addToArr(input.value);

    input.value = "";
  }
};

things.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("fa-check")) {
    checkStatus(e.target.parentElement.getAttribute("data-id"));

    e.target.parentElement.classList.toggle("done");
  }
});

function addToArr(tasktext) {
  let task = {
    id: Date.now(),
    title: tasktext,
    completed: false,
  };

  thingsArr.push(task);

  addToPage(thingsArr);

  addToLocalStorage(thingsArr);
}

function addToPage(task) {
  things.innerHTML = "";

  thingsArr.forEach((task) => {
    let thing = document.createElement("div");

    thing.classeName = "thing";

    thing.setAttribute("data-id", task.id);

    thing.innerHTML = `<i class="fa fa-check"></i>
        <div class="text">${task.title}</div>
        <i class="fa fa-trash"></i>`;

    if (task.completed == true) {
      thing.classList = "done";
    }
    things.appendChild(thing);
  });
}

function addToLocalStorage(thingsArr) {
  window.localStorage.setItem("task", JSON.stringify(thingsArr));
}

function getFromLocalStorage() {
  let data = window.localStorage.getItem("task");

  if (data) {
    let tasks = JSON.parse(data);
    addToPage(tasks);
  }
}

function deleteTaskWith(taskId) {
  thingsArr = thingsArr.filter((task) => task.id != taskId);

  addToLocalStorage(thingsArr);
}

function checkStatus(taskId) {
  for (let i = 0; i < thingsArr.length; i++) {
    if (thingsArr[i].id == taskId) {
      thingsArr[i].completed == false
        ? (thingsArr[i].completed = true)
        : (thingsArr[i].completed = false);
    }
    addToLocalStorage(thingsArr);
  }
}
