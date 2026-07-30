import { makeElement } from "./domHelper.js";
import "./styles/projects.css"

export const projects = [];

export class Project {
  constructor(name) {
    // this.id = crypto.randomUUID();
    this.name = name;
    this.todos = [];
  }

  addTodo(name, dueDate, priority) {
    const task = new Todo(name, dueDate, priority);
    this.todos.push(task);
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }
}

export class Todo {
  constructor(name, dueDate, priority){
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }

  toggleCompleted(){
    this.completed = !this.completed;
  }
}

const defaultProject = new Project("General");
projects.push(defaultProject);
defaultProject.addTodo("Example", "2026-07-18", "medium");



window.Project = Project;
window.Todo = Todo;
window.projects = projects;