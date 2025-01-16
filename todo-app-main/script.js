document.addEventListener("DOMContentLoaded", () => {
  const darkModeIcon = document.getElementById("dark-mode-icon");
  const lightModeIcon = document.getElementById("light-mode-icon");
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  // Code for Theme Toggle

  // Set the initial theme based on localStorage
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    darkModeIcon.classList.add("hidden");
    lightModeIcon.classList.remove("hidden");
  }

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark");
    darkModeIcon.classList.toggle("hidden", isDarkMode);
    lightModeIcon.classList.toggle("hidden", !isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });

  // Todo code
  const todoList = document.querySelector(".todoLists");
  const todoInput = document.getElementById("todoInput");
  const tasksLeft = document.querySelector(".tasksLeft");
  const showAllTasks = document.querySelectorAll(".showAllTasks");
  const showActiveTasks = document.querySelectorAll(".showActiveTasks");
  const showCompletedTasks = document.querySelectorAll(".showCompletedTasks");
  const clearCompletedTasks = document.querySelector(
    ".clearCompletedTasksFromList"
  );
  const checkedImg = document.querySelector(".checkedImg");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let currentFilter = "all";

  // Render tasks initially
  renderTasks();

  // Add new task
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const taskText = todoInput.value.trim();
      if (taskText === "") return;
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      tasks.push(newTask);
      saveTasks();
      todoInput.value = "";
      renderTasks();
    }
  });

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Render tasks based on current filter
  function renderTasks() {
    todoList.innerHTML = ""; // Clear the list before rendering
    getFilteredTasks().forEach((task) => {
      const li = document.createElement("li");
      li.setAttribute("data-id", task.id);
      li.className = task.completed ? "completed" : "";
      li.innerHTML = `
      <div class="flex items-center justify-between p-4 text-neutral-lightTheme-veryDarkGrayishBlue text-lg bg-neutral-lightTheme-veryLightGray border-b-2 border-neutral-lightTheme-darkGrayishBlue dark:bg-neutral-darkTheme-veryDarkDesaturatedBlue dark:text-neutral-darkTheme-lightGrayishBlue dark:border-neutral-darkTheme-veryDarkGrayishBlue1">
        <div class="flex items-center justify-start gap-4">
          <label class="flex items-center cursor-pointer relative">
            <input type="checkbox" class="appearance-none w-6 h-6 rounded-full border-2 cursor-pointer taskCompleted ${
              task.completed ? "checked" : ""
            } " ${task.completed ? "checked" : ""} />
            <img src="./images/icon-check.svg" alt="tick for checkbox" class="checkedImg ${
              task.completed ? "" : "hidden"
            } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 z-10" />
          </label>
          <span class="taskText ${
            task.completed ? "line-through" : ""
          } dark:hover:text-neutral-darkTheme-lightGrayishBlueHover">
            ${task.text}
          </span>
        </div>
        <span class="cursor-pointer taskDelete">
          <img src="./images/icon-cross.svg" alt="delete" />
        </span>
      </div>
    `;

      // Toggle task completion
      li.querySelector(".taskCompleted").addEventListener("change", (e) => {
        const taskId = parseInt(li.getAttribute("data-id"));
        const task = tasks.find((t) => t.id === taskId);
        task.completed = e.target.checked;
        saveTasks();
        renderTasks();
      });

      // Delete task
      li.querySelector(".taskDelete").addEventListener("click", (e) => {
        e.stopPropagation();
        const taskId = parseInt(li.getAttribute("data-id"));
        tasks = tasks.filter((t) => t.id !== taskId);
        saveTasks();
        renderTasks();
      });

      todoList.appendChild(li);
    });

    // Update tasks left count
    const activeTasksCount = tasks.filter((task) => !task.completed).length;
    tasksLeft.textContent = `${activeTasksCount} tasks left`;
  }

  // Filter tasks - Show All
  showAllTasks.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = "all";
      renderTasks();
    });
  });

  // Filter tasks - Show Active
  showActiveTasks.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = "active";
      renderTasks();
    });
  });

  // Filter tasks - Show Completed
  showCompletedTasks.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = "completed";
      renderTasks();
    });
  });

  // Clear completed tasks
  clearCompletedTasks.addEventListener("click", () => {
    tasks = tasks.filter((task) => !task.completed);
    saveTasks();
    renderTasks();
  });

  // Get tasks based on filter
  function getFilteredTasks() {
    if (currentFilter === "active") {
      return tasks.filter((task) => !task.completed);
    } else if (currentFilter === "completed") {
      return tasks.filter((task) => task.completed);
    }
    return tasks; // Default to "all"
  }
});
