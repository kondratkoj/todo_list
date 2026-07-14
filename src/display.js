import { makeElement } from "./domHelper.js";
import { projects, Project, Todo } from "./projects.js";

const navBar = document.querySelector(".navBar");
const main = document.querySelector(".main");

const projectList = makeElement("ul", "projectList");
const todolist = makeElement("div", "todoList");

navBar.append(projectList);
main.append(todoList);


export function updateDisplay() {
  navBar.replaceChildren();

  for (let project of projects) {
    let newProject = makeElement("div","project",project.name);
    projectList.append(newProject);
  }
}

