import { deleteProject } from "./controller.js";
import { makeElement } from "./domHelper.js";
import { projects, Project, Todo } from "./projects.js";

let navBar;
let main;
let projectList;
// let todoList;

export function initDisplay() {
  navBar = document.querySelector(".navBar");
  main = document.querySelector(".main");

  projectList = makeElement("ul", "projectList");
  // todoList = makeElement("div", "todoList");

  navBar.append(projectList);
  // main.append(todoList);
}

export function updateDisplay() {
  projectList.replaceChildren();

  for (let project of projects) {
    const li = makeElement("li","project");
    const text = makeElement("span", "", project.name)
    const deleteBtn = makeElement("button", "deleteBtn button", "X")

    deleteBtn.addEventListener("click", () => {
      deleteProject(project);
    })
    
    li.append(text, deleteBtn);
    projectList.append(li);
  }
}