import { makeElement } from "./domHelper.js";
import { projects, Project, Todo } from "./projects.js";

let navBar;
let main;
let projectList;
let todoList;
let allTodoBtn;

export function initDisplay() {
  navBar = document.querySelector(".navBar");
  main = document.querySelector(".main");

  projectList = makeElement("ul", "projectList");
  todoList = makeElement("section", "todoList");
  allTodoBtn = makeElement("button","allTodoBtn","All Todos");

  navBar.append(allTodoBtn, projectList);
  main.append(todoList);

  allTodoBtn.addEventListener("click", displayAllTodos)
}

export function displayAllTodos() {
  todoList.replaceChildren();

  for (const project of projects) {
    for (const todo of project.todos) {
      const div = makeElement("div", "todoItem",);
      const text = makeElement("span", "", todo.name);
      const dueDate = makeElement("div", "dueDate", todo.dueDate)

      div.append(text, dueDate);
      todoList.append(div);
    }
  }
}

export function updateDisplay(onDelete, onSelect) {
  projectList.replaceChildren();

  allTodoBtn = document.querySelector("allTodoBtn");

  for (let project of projects) {
    const li = makeElement("li","project");
    const projectBtn = makeElement("button", "projectBtn", project.name)
    const deleteBtn = makeElement("button", "deleteBtn button", "X")

    projectBtn.addEventListener("click", () => {
      onSelect(project);
    })

    deleteBtn.addEventListener("click", () => {
      onDelete(project);
    })

    li.append(projectBtn, deleteBtn);
    projectList.append(li);
  }
}

export function updateTodos(project) {
  todoList.replaceChildren();

  for (const todo of project.todos) {
    const div = makeElement("div", "todoItem",);
    const text = makeElement("span", "", todo.name);
    const dueDate = makeElement("div", "dueDate", todo.dueDate)

    div.append(text, dueDate);
    todoList.append(div);
  }
}