const inputText = document.getElementById("input-text");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const doneBtn = document.querySelector(".doneBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const deleteAll = document.getElementById("deleteAll");


// legger til teksten du skriver
function addTask() {
  if (inputText.value.trim() === '') {
    alert("You must write something")
  } else {
    let li = document.createElement("li");
    li.innerHTML = `${inputText.value}` + `<i class="fa-solid fa-check doneBtn"></i>` + `<i class="fa-solid fa-xmark deleteBtn" ></i>`;
    taskList.appendChild(li);
    updateTaskCount();
    
      /* li.querySelector(".doneBtn").addEventListener("click", function() {
      li.classList.toggle("done");
    });  */

    saveData();
  }
  inputText.value = "";
}


// oppdaterer task counten
function updateTaskCount() {
  let taskListItems = taskList.getElementsByTagName("li");
  taskCount.textContent = "Task count: " + taskListItems.length;
}


// sletter alt i listen
deleteAll.addEventListener("click", deleteAllTasks);

function deleteAllTasks() {
  taskList.innerHTML = "";
  updateTaskCount();
  saveData();
}


// ferdig knapp
let doneButtons = document.querySelectorAll(".doneBtn");
  doneButtons.forEach(button => {
    button.addEventListener("click", function() {
      button.parentElement.classList.toggle("done");
      saveData();
    });
  });


// ferdig knapp etter refresha side
taskList.addEventListener("click", function(event) {
  if (event.target && event.target.classList.contains("doneBtn")) {
    event.target.parentElement.classList.toggle("done");
    saveData();
  }
});


// sletter bare det ene itemen
taskList.addEventListener("click", function(del) {
  if (del.target && del.target.classList.contains("deleteBtn")) {
    del.target.parentElement.remove();
    updateTaskCount();
    inputText.value = "";
  }
  saveData();
})


// Legger til teksten også med enter
inputText.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    addTask();
  }
  saveData();
})


// local storage
function saveData() {
  localStorage.setItem('data', taskList.innerHTML);
}

function showTask() {
  taskList.innerHTML = localStorage.getItem('data');
  updateTaskCount();
}
showTask(); 