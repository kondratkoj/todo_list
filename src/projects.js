import { makeElement } from "./domHelper.js";
import "./styles/projects.css"

export const projects = [];

export class Project {
  constructor(name) {
    this.name = name;
    this.todo = [];
  }

  addTodo(name, dueDate, priority) {
    const task = new Todo(name, dueDate, priority);
    this.todo.push(task);
  }

  removeTodo(index) {
    this.todo.splice(index, 1);
  }
}

export class Todo {
  constructor(name, dueDate, priority){
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }

  rename(newName){
    this.name = newName;
  }

  toggleCompleted(){
    this.completed = !this.completed;
  }
}

const defaultProject = new Project("Default");
projects.push(defaultProject);

window.Project = Project;
window.Todo = Todo;
window.projects = projects;