import { projects, Project, Todo } from "./projects.js";
import { 
  updateDisplay, 
  updateTodos, 
  displayAllTodos, 
  openTodoDialog } from "./display.js";
import { saveProjects, loadProjects } from "./storage.js";

let activeProject;
let editingTodo;

export function setupController () {
  const newProject = document.querySelector(".newPrjct");
  const newTodo = document.querySelector(".newTodo");
  newProject.addEventListener("click", addProject);
  newTodo.addEventListener("click", () => {
    openTodoDialog();
  });
  populateProjects();
  renderCurrentView();
}

function populateProjects() {
  let loadedProjects = loadProjects();

  if (loadedProjects.length === 0) {
    const project = new Project("General");
    project.addTodo("Example", "2026-07-18", "medium");

    projects.push(project);
  }

  for (const loadedProject of loadedProjects) {
    const project = new Project(loadedProject.name);

    for (const loadedTodo of loadedProject.todos) {
      const todo = new Todo(
        loadedTodo.name,
        loadedTodo.dueDate,
        loadedTodo.priority
      );

      todo.completed = loadedTodo.completed;
      project.todos.push(todo);
    }

    projects.push(project);
  }
}

export function selectAllTodos() {
  activeProject = null;
  renderCurrentView();
}

function addProject() {
  const projectName = prompt("New Project Name");
  const project = new Project(projectName)
  projects.push(project);
  saveProjects(projects);
  updateDisplay(activeProject, deleteProject, selectProject);
}

export function onTodoSubmit(todoData) {
  if (editingTodo) {
    editingTodo.name = todoData.name;
    editingTodo.dueDate = todoData.dueDate;
    editingTodo.priority = todoData.priority;
  } else if (activeProject != null) {
    activeProject.addTodo(todoData.name, todoData.dueDate, todoData.priority);
  } else {
    alert("No Project Selected")
  };
  editingTodo = null;
  saveProjects();
  renderCurrentView();
}

function deleteProject(project){
    const wasActiveProject = project === activeProject //returns a boolean

    const projectIndex = projects.indexOf(project);
    projects.splice(projectIndex, 1);

    if (wasActiveProject) {
      activeProject = null;
    }
  
    saveProjects(projects);
    
    renderCurrentView();
}

function selectProject(project) {
  activeProject = project;
  // console.log(`${activeProject.name} is active`);
  updateDisplay(activeProject, deleteProject, selectProject);
  renderCurrentView();
}

export function onDeleteTodo(todo) {
  const owner = projects.find(project => {
    return project.todos.includes(todo);
  });
  const todoIndex = owner.todos.indexOf(todo);
  owner.removeTodo(todoIndex);
  saveProjects(projects);
  renderCurrentView();
}

export function onToggleTodo(todo) {
  todo.toggleCompleted();
  saveProjects(projects);
  renderCurrentView();
}

function editTodo(todo) {
  editingTodo = todo;
  openTodoDialog(todo);
}

function renderCurrentView() {
  if (activeProject != null) {
    updateTodos(activeProject, onDeleteTodo, onToggleTodo, editTodo);
  } else {
    displayAllTodos(onDeleteTodo, onToggleTodo, editTodo);
  }

  updateDisplay(activeProject, deleteProject, selectProject);
}