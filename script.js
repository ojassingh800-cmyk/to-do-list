let lists = JSON.parse(localStorage.getItem("lists")) || {};
let currentList = null;

// Add new list
function addList() {
  const input = document.getElementById("newListInput");
  const listName = input.value.trim();
  if (listName === "" || lists[listName]) return;

  lists[listName] = [];
  input.value = "";
  currentList = listName;
  saveLists();
  renderLists();
  renderTasks();
}

// Switch to a list
function switchList(listName) {
  currentList = listName;
  renderLists();
  renderTasks();
}

// Add task
function addTask() {
  if (!currentList) return alert("Select or create a list first!");
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  lists[currentList].push({ text: taskText, completed: false });
  input.value = "";
  saveLists();
  renderTasks();
}

// Toggle task complete
function toggleTask(index) {
  lists[currentList][index].completed = !lists[currentList][index].completed;
  saveLists();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  lists[currentList].splice(index, 1);
  saveLists();
  renderTasks();
}

// Save to localStorage
function saveLists() {
  localStorage.setItem("lists", JSON.stringify(lists));
}

// Render sidebar lists
function renderLists() {
  const container = document.getElementById("listContainer");
  container.innerHTML = "";
  for (let list in lists) {
    const li = document.createElement("li");
    li.textContent = list;
    if (list === currentList) li.classList.add("active");
    li.onclick = () => switchList(list);
    container.appendChild(li);
  }
}

// Render tasks
function renderTasks() {
  const taskList = document.getElementById("taskList");
  const title = document.getElementById("currentListTitle");
  taskList.innerHTML = "";

  if (!currentList) {
    title.textContent = "📝 Select a List";
    return;
  }

  title.textContent = `📝 ${currentList}`;
  lists[currentList].forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    li.onclick = () => toggleTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Initial load
renderLists();
renderTasks();
