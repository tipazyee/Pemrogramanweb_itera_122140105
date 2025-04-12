let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `flex justify-between items-center p-2 rounded border ${task.done ? "bg-green-100 dark:bg-green-700" : "bg-white dark:bg-gray-800"} text-gray-700 dark:text-gray-300`;

        li.innerHTML = `
            <span class="${task.done ? "line-through text-green-600 dark:text-green-400" : ""}">${task.title}</span>
            <div class="flex gap-2">
                <button onclick="toggleTask(${index})" class="text-sm px-2 py-1 border rounded text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600">
                    ${task.done ? "✔ Selesai" : "Tandai Selesai"}
                </button>
                ${task.done
                    ? `<button onclick="deleteTask(${index})" class="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                            Hapus
                        </button>`
                    : ""}
            </div>
        `;

        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const value = input.value.trim();
    if (value !== "") {
        tasks.push({ title: value, done: false });
        input.value = "";
        saveTasks();
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveNotes() {
    const note = document.getElementById("noteArea").value;
    localStorage.setItem("notes", note);
}

function loadNotes() {
    const savedNote = localStorage.getItem("notes");
    if (savedNote) {
        document.getElementById("noteArea").value = savedNote;
    }
}

const htmlElement = document.documentElement;
const toggleBtn = document.getElementById("darkModeToggle");
const lightModeText = '☀️ Light Mode';
const darkModeText = '🌙 Dark Mode';

function setDarkMode(enabled) {
    if (enabled) {
        htmlElement.classList.add("dark");
        toggleBtn.textContent = lightModeText;
        localStorage.setItem("darkMode", "enabled");
    } else {
        htmlElement.classList.remove("dark");
        toggleBtn.textContent = darkModeText;
        localStorage.setItem("darkMode", "disabled");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
    loadNotes();

    // Load dark mode preference from local storage
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
        setDarkMode(true);
    }
});

toggleBtn.addEventListener("click", () => {
    const isDarkMode = htmlElement.classList.contains("dark");
    setDarkMode(!isDarkMode);
});