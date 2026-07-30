import { projects, Project, Todo } from "./projects.js";
import { 
  updateDisplay, 
  updateTodos, 
  displayAllTodos, 
  openTodoDialog } from "./display.js";

let activeProject;

export function setupController () {
  const newProject = document.querySelector(".newPrjct");
  const newTodo = document.querySelector(".newTodo");
  newProject.addEventListener("click", addProject);
  updateDisplay(deleteProject, selectProject);
  newTodo.addEventListener("click", () => {
    openTodoDialog();
  });
  renderCurrentView();
}

export function selectAllTodos() {
  activeProject = null;
  renderCurrentView();
}

function addProject() {
  const projectName = prompt("New Project Name");
  const project = new Project(projectName)
  projects.push(project);
  updateDisplay(deleteProject, selectProject);
}

export function onTodoSubmit(todoData) {
  if (activeProject != null) {
    activeProject.addTodo(todoData.name, todoData.dueDate, todoData.priority);
  } else {
    alert("No Project Selected")
  };

  renderCurrentView();
}

function deleteProject(project){
    const wasActiveProject = project === activeProject //returns a boolean

    const projectIndex = projects.indexOf(project);
    projects.splice(projectIndex, 1);

    updateDisplay(deleteProject, selectProject)
    
    if (wasActiveProject) {
      activeProject = null;
    }
  
    renderCurrentView();
}

function selectProject(project) {
  activeProject = project;
  console.log(`${activeProject.name} is active`);
  updateDisplay(deleteProject, selectProject);
  renderCurrentView();
}

export function onDeleteTodo(todo) {
  const owner = projects.find(project => {
    return project.todos.includes(todo);
  });
  const todoIndex = owner.todos.indexOf(todo);
  owner.removeTodo(todoIndex);
  renderCurrentView();
}

export function onToggleTodo(todo) {
  todo.toggleCompleted();
  renderCurrentView();
}

function renderCurrentView() {
  if (activeProject != null) {
    updateTodos(activeProject, onDeleteTodo, onToggleTodo);
  } else {
    displayAllTodos(onDeleteTodo, onToggleTodo);
  }
}