const todoInputEl = document.querySelector("#todoInput");
const addTodoEl = document.querySelector("#addTodo");
const headerListEl = document.querySelector("#header_list_container");
const pendingTasksEl = document.querySelector("#pending_tasks");

// immediately our page loads the function below will fire
(function() {
    renderTodoList();
    pendingTasks();
})()


// add a todo 
addTodoEl.addEventListener("click", () => {
    if(todoInputEl.value !== "") {
        let userData = todoInputEl.value;
        let getLocalStorage = localStorage.getItem("todos");
        if(getLocalStorage == null) {
            todosArray = []
        } else {
            todosArray = JSON.parse(getLocalStorage)
        }
        todosArray.push(userData);
        localStorage.setItem("todos", JSON.stringify(todosArray));
        todoInputEl.value = ""
        renderTodoList();
        pendingTasks();
    } else {
        alert("Enter a Todo")
    }
});


// display the todoList
function renderTodoList() {
    let getLocalStorage = localStorage.getItem("todos");
    if(getLocalStorage == null) {
        todosArray = []
    } else {
        todosArray = JSON.parse(getLocalStorage)
    }
    headerListEl.innerHTML = ""
    todosArray.forEach((element, index) => {
        const todoDiv = document.createElement("div");
        todoDiv.innerHTML = `
        <div class="todo_list">
        <ul class="bg-gray-100 my-2 p-2">
            <li class="flex justify-between items-center font-bold">${element} <span class="text-lg hover:text-red-500" onClick="deleteTodo(${index})"><i class='bx bx-trash-alt'></i></span></li>
        </ul>
    </div>
        `;

    headerListEl.appendChild(todoDiv)
    })
};


// delete the todo
function deleteTodo(index) {
    let getLocalStorage = localStorage.getItem("todos");
    todosArray = JSON.parse(getLocalStorage)
    todosArray.splice(index,1);
    localStorage.setItem("todos", JSON.stringify(todosArray));
    renderTodoList();
    pendingTasks();
}


// pending tasks
function pendingTasks() {
    let getLocalStorage = localStorage.getItem("todos");
    todosArray = JSON.parse(getLocalStorage);
    if(todosArray.length > 0) {
        pendingTasksEl.textContent = `Pending Tasks: ${todosArray.length}`
    } else {
        pendingTasksEl.textContent = `You have no pending tasks`
    }
}