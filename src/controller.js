import { makeElement } from "./domHelper.js";
import { projects, Project, Todo } from "./projects.js";
import { updateDisplay, updateTodos, displayAllTodos } from "./display.js";


export function setupController () {
  const newProject = document.querySelector(".newPrjct");
  const newTodo = document.querySelector(".newTodo");
  newProject.addEventListener("click", addProject);
  updateDisplay(deleteProject, selectProject);
  // newTodo.addEventListener("click", )
}

function addProject() {
  const projectName = prompt("New Project Name");
  const project = new Project(projectName)
  projects.push(project);
  updateDisplay(deleteProject, selectProject);
}

// function addTodo() {
//   const todoName
// }

function deleteProject(project){
    const projectIndex = projects.indexOf(project);
    
    if (projectIndex !== -1) {
      projects.splice(projectIndex, 1);
      updateDisplay(deleteProject, selectProject);
      updateTodos(activeProject);
    }
}

let activeProject = projects[0];

function selectProject(project) {
  activeProject = project;
  updateDisplay(deleteProject, selectProject);
  updateTodos(activeProject);
}
