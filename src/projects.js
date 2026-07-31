import { makeElement } from "./domHelper.js";
import "./styles/projects.css"

export let projects = [];

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

window.Project = Project;
window.Todo = Todo;
window.projects = projects;