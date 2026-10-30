<<<<<<< HEAD
git add script.js
// Récupération des éléments HTML

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const priorityInput = document.getElementById("task-priority");
const deadlineInput = document.getElementById("task-deadline");

const taskList = document.getElementById("task-list");
const counter = document.getElementById("counter");

const filters = document.querySelectorAll(".filter");

// Récupération des tâches sauvegardées

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Adapter les anciennes tâches si nécessaire

tasks = tasks.map(function(task) {

    return {
        ...task,
        deadlineDays: task.deadlineDays || 1,
        status: ["todo", "progress", "done"].includes(task.status)
            ? task.status
            : "todo"
    };

});

// Filtre actif

let currentFilter = "all";

// Sauvegarder les tâches

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Changer le filtre actif

function changeFilter(filterValue) {

    currentFilter = filterValue;

    filters.forEach(function(button) {

        button.classList.remove("active");

        if (button.dataset.filter === currentFilter) {
            button.classList.add("active");
        }

    });

}

// Afficher les tâches

function displayTasks() {

    taskList.innerHTML = "";

    // Filtrer les tâches

    let filteredTasks = tasks.filter(function(task) {

        if (currentFilter === "all") {
            return true;
        }

        return task.status === currentFilter;

    });

    // Afficher chaque tâche

    filteredTasks.forEach(function(task) {

        const li = document.createElement("li");

        if (task.status === "done") {
            li.classList.add("task-done");
        }

        // Informations de la tâche

        const info = document.createElement("div");
        info.className = "task-info";

        const name = document.createElement("span");
        name.className = "task-name";
        name.textContent = task.name;

        const meta = document.createElement("div");
        meta.className = "task-meta";

        // Priorité

        const priority = document.createElement("span");

        priority.textContent = "Priorité : " + task.priority;

        if (task.priority === "Haute") {

            priority.className = "priority-high";

        } else if (task.priority === "Moyenne") {

            priority.className = "priority-medium";

        } else {

            priority.className = "priority-low";

        }

        // Délai en jours

        const deadline = document.createElement("span");

        deadline.textContent = "Délai : " + task.deadlineDays +
            (task.deadlineDays > 1 ? " jours" : " jour");

        deadline.className = "deadline";

        // Statut

        const status = document.createElement("span");

        if (task.status === "todo") {

            status.textContent = "À faire";
            status.className = "status-todo";

        } else if (task.status === "progress") {

            status.textContent = "En cours";
            status.className = "status-progress";

        } else {

            status.textContent = "Terminée";
            status.className = "status-done";

        }

        meta.appendChild(priority);
        meta.appendChild(deadline);
        meta.appendChild(status);

        info.appendChild(name);
        info.appendChild(meta);

        // Zone des actions

        const actions = document.createElement("div");
        actions.className = "task-actions";

        // Modifier le statut

        const select = document.createElement("select");
        select.className = "status-select";

        const options = [
            { value: "todo", text: "À faire" },
            { value: "progress", text: "En cours" },
            { value: "done", text: "Terminée" }
        ];

        options.forEach(function(option) {

            const opt = document.createElement("option");

            opt.value = option.value;
            opt.textContent = option.text;

            if (task.status === option.value) {
                opt.selected = true;
            }

            select.appendChild(opt);

        });

        select.addEventListener("change", function() {

            // Modifier le statut

            task.status = select.value;

            // Activer automatiquement le filtre correspondant

            changeFilter(task.status);

            // Sauvegarder et actualiser

            saveTasks();
            displayTasks();

        });

        // Supprimer une tâche

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Supprimer";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {

            tasks = tasks.filter(function(t) {

                return t.id !== task.id;

            });

            saveTasks();
            displayTasks();

        });

        // Ajouter les actions

        actions.appendChild(select);
        actions.appendChild(deleteButton);

        li.appendChild(info);
        li.appendChild(actions);

        taskList.appendChild(li);

    });

    // Calculer les tâches restantes

    const remaining = tasks.filter(function(task) {

        return task.status !== "done";

    }).length;

    counter.textContent =
        remaining + " tâche(s) restante(s) sur " + tasks.length;

}

// Ajouter une nouvelle tâche

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskName = input.value.trim();

    const deadlineDays = Number(deadlineInput.value);

    // Vérifier les informations

    if (
        taskName === "" ||
        !Number.isInteger(deadlineDays) ||
        deadlineDays < 1
    ) {

        alert("Veuillez saisir une tâche et un délai valide en jours.");

        return;

    }

    // Créer la tâche

    const newTask = {

        id: Date.now(),

        name: taskName,

        priority: priorityInput.value,

        deadlineDays: deadlineDays,

        status: "todo"

    };

    // Ajouter la tâche au tableau

    tasks.push(newTask);

    // Sauvegarder

    saveTasks();

    // Vider les champs

    input.value = "";
    deadlineInput.value = "";

    // Afficher automatiquement À faire

    changeFilter("todo");

    displayTasks();

});

// Gérer les filtres

filters.forEach(function(button) {

    button.addEventListener("click", function() {

        changeFilter(button.dataset.filter);

        displayTasks();

    });

});

// Sauvegarder les anciennes tâches adaptées

saveTasks();

// Affichage initial

displayTasks();
=======
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(text) {
  tasks.push({ id: Date.now(), text: text, done: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  task.done = !task.done;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

function render() {
  list.innerHTML = "";

  const visibleTasks = tasks.filter((t) => {
    if (currentFilter === "todo") return !t.done;
    if (currentFilter === "done") return t.done;
    return true;
  });

  visibleTasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.append(checkbox, span, deleteBtn);
    list.appendChild(li);
  });

  const remaining = tasks.filter((t) => !t.done).length;
  counter.textContent = remaining + " tâche(s) restante(s)";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;
  addTask(text);
  input.value = "";
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
>>>>>>> 7a289340507cecc02fe13723d5765f9f8811d304
