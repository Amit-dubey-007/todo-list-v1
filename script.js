// js for to-do list app 

const btn = document.querySelector(".add-btn");
const input = document.querySelector("#text");
const tasks = document.querySelector(".alltasks");
const delete_all = document.querySelector(".delete-all");

// tasksArray to store data in localstorage
let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

// save Tasksarray data to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// all array tasks--> DOM 
function renderTasks() {
    tasks.innerHTML = "";

    tasksArray.forEach((taskObj, index) => {
        const task = document.createElement("div");
        task.classList.add("task");
        if (taskObj.done) task.classList.add("done");

        const check = document.createElement("input");
        check.type = "checkbox";
        check.checked = taskObj.done;
        check.dataset.index = index;

        const task_text = document.createElement("p");
        task_text.classList.add("task-text");
        task_text.innerText = taskObj.text;
        task_text.dataset.index = index;

        const edit = document.createElement("button");
        edit.innerText = "edit";
        edit.classList.add("edit");
        edit.dataset.index = index;

        const del = document.createElement("button");
        del.innerText = "delete";
        del.classList.add("del");
        del.dataset.index = index;

        task.append(check, task_text, edit, del);
        tasks.append(task);
    });

    saveTasks();
}

// add a new task in task array
function add() {
    if (input.value.trim() === "") return;

    tasksArray.push({
        text: input.value,
        done: false
    });

    input.value = "";
    renderTasks();
} 

// add task on clicking add button
btn.addEventListener("click", add);

// add task on pressing enter key
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") add();
});

tasks.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    // delete task from TasksArray 
    if (e.target.classList.contains("del")) {
        tasksArray.splice(index, 1);
        renderTasks();
    }

    // checkbox tick by clicking text
    if (e.target.tagName === "P" && !(e.target.parentElement.classList.contains("editing"))) {
        tasksArray[index].done = !tasksArray[index].done;
        renderTasks();
    }

    // edit
    if (e.target.classList.contains("edit")) {
        const task = e.target.parentElement;
        const text = task.querySelector(".task-text");

        if (task.classList.contains("editing")) {
            //save
            text.contentEditable = "false";
            tasksArray[index].text = text.innerText;
            task.classList.remove("editing");
            e.target.innerText = "edit";
            renderTasks();
        } else {
            //edit mode
            text.contentEditable = "true";
            task.classList.add("editing");
            e.target.innerText = "save";
            text.focus();
        }
    }
});

// checkbox tick by clicking on checkbox
tasks.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        const index = e.target.dataset.index;
        tasksArray[index].done = e.target.checked;
        renderTasks();
    }
});

// delete all task from taskArray
delete_all.addEventListener("click", () => {
    tasksArray = [];
    renderTasks();
});

// to initially load task when page is load to view old tasks
renderTasks();
