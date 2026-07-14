import { makeElement } from "./domHelper.js";
import "./styles/controller.css"
import { projects, Project, Todo } from "./projects.js";
import { updateDisplay } from "./display.js";


export function setupController () {
  const newProject = document.querySelector(".newPrjct");
  const newTodo = document.querySelector(".newTodo");
  newProject.addEventListener("click", addProject)
  // newTodo.addEventListener("click", )
}

function addProject() {
  const projectName = prompt("New Project Name");
  const project = new Project(projectName)
  projects.push(project);
  updateDisplay
}

// function addTodo() {
//   const todoName
// }

window.addProject = addProject