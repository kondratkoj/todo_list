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

  updateTodos(activeProject);
}

function deleteProject(project){
    const wasActiveProject = project === activeProject //returns a boolean

    const projectIndex = projects.indexOf(project);
    projects.splice(projectIndex, 1);

    updateDisplay(deleteProject, selectProject)
    
    if (wasActiveProject) {
      activeProject = null;
      displayAllTodos();
    } else { updateTodos(activeProject) }
}

function selectProject(project) {
  activeProject = project;
  console.log(`${activeProject.name} is active`);
  updateDisplay(deleteProject, selectProject);
  updateTodos(project);
}
