import { makeElement } from "./domHelper.js";
import { projects, Project, Todo } from "./projects.js";

let navBar;
let main;
let projectList;
let todoList;
let allTodoBtn;
let todoDialog;
let todoForm;

export function initDisplay(onTodoSubmit, onSelectAllTodos) {
  navBar = document.querySelector(".navBar");
  main = document.querySelector(".main");

  projectList = makeElement("ul", "projectList");
  todoList = makeElement("section", "todoList");
  allTodoBtn = makeElement("button","allTodoBtn","All Todos");

  createTodoDialog(onTodoSubmit);

  navBar.append(allTodoBtn, projectList);
  main.append(todoList, todoDialog);

  allTodoBtn.addEventListener("click", () => {
    onSelectAllTodos()
  });
}

function createTodoDialog(onTodoSubmit) {
  todoDialog = makeElement("dialog", "todoDialog");
  todoForm = makeElement("form", "todoForm");

  const title = makeElement("h2", "", "Create Todo");

  const nameLabel = makeElement("label", "", "Todo name");
  const nameInput = makeElement("input", "todoNameInput");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.required = true;

  const dateLabel = makeElement("label", "", "Due date");
  const dateInput = makeElement("input", "todoDateInput");
  dateInput.type = "date";
  dateInput.name = "dueDate";

  const priorityLabel = makeElement("label", "", "Priority");
  const prioritySelect = makeElement("select", "todoPriorityInput");
  prioritySelect.name = "priority";

  const lowOption = makeElement("option", "", "Low");
  lowOption.value = "low";

  const mediumOption = makeElement("option", "", "Medium");
  mediumOption.value = "medium";

  const highOption = makeElement("option", "", "High");
  highOption.value = "high";

  prioritySelect.append(lowOption, mediumOption, highOption);

  const buttonContainer = makeElement("div", "dialogButtons");

  const cancelBtn = makeElement("button", "cancelBtn", "Cancel");
  cancelBtn.type = "button";

  const submitBtn = makeElement("button", "submitBtn", "Add Todo");
  submitBtn.type = "submit";

  nameLabel.append(nameInput);
  dateLabel.append(dateInput);
  priorityLabel.append(prioritySelect);
  buttonContainer.append(cancelBtn, submitBtn);

  todoForm.append(
    title,
    nameLabel,
    dateLabel,
    priorityLabel,
    buttonContainer
  );

  todoDialog.append(todoForm);

  cancelBtn.addEventListener("click", () => {
    closeTodoDialog();
  });

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const todoData = {
      name: nameInput.value,
      dueDate: dateInput.value,
      priority: prioritySelect.value,
    };

    onTodoSubmit(todoData);

    closeTodoDialog();
  });
}

export function openTodoDialog() {
  todoDialog.showModal();
}

export function closeTodoDialog() {
  todoForm.reset();
  todoDialog.close();
}

export function displayAllTodos(onDeleteTodo, onToggleTodo) {
  todoList.replaceChildren();

  for (const project of projects) {
    for (const todo of project.todos) {
      const div = makeElement("div", "todoItem");
      const text = makeElement("span", "todoName", todo.name);
      const dueDate = makeElement("div", "dueDate", todo.dueDate);
      const deleteBtn = makeElement("button", "deleteBtn", "Remove");

      const completedLabel = makeElement("label", "complete");
      const completedBox = makeElement("input", "completed");

      completedBox.type = "checkbox";
      completedBox.checked = todo.completed;

      completedLabel.append(
        completedBox,
        document.createTextNode(" Completed")
      );

      completedBox.addEventListener("change", () => {
        onToggleTodo(todo);
      });

      deleteBtn.addEventListener("click", () => {
        onDeleteTodo(todo);
      });

      div.append(
        completedLabel,
        text,
        dueDate,
        deleteBtn
      );

      todoList.append(div);
    }
  }
}

export function updateDisplay(onDelete, onSelect) {
  projectList.replaceChildren();

  for (let project of projects) {
    const li = makeElement("li","project");
    const projectBtn = makeElement("button", "projectBtn", project.name)
    const deleteBtn = makeElement("button", "deleteBtn button", "X")

    projectBtn.addEventListener("click", () => {
      onSelect(project);
      // console.log(`you clicked ${project.name}`);
    })

    deleteBtn.addEventListener("click", () => {
      onDelete(project);
    })

    li.append(projectBtn, deleteBtn);
    projectList.append(li);
  }
}

export function updateTodos(project, onDeleteTodo, onToggleTodo) {
  todoList.replaceChildren();

  if (!project) return;

  for (const todo of project.todos) {
    const div = makeElement("div", "todoItem");
    const text = makeElement("span", "todoName", todo.name);
    const dueDate = makeElement("div", "dueDate", todo.dueDate);
    const deleteBtn = makeElement("button", "deleteBtn", "Remove");

    const completedLabel = makeElement("label", "complete");
    const completedBox = makeElement("input", "completed");

    completedBox.type = "checkbox";
    completedBox.checked = todo.completed;

    completedLabel.append(
      completedBox,
      document.createTextNode(" Completed")
    );

    completedBox.addEventListener("change", () => {
      onToggleTodo(todo);
    });

    deleteBtn.addEventListener("click", () => {
      onDeleteTodo(todo);
    });

    div.append(
      completedLabel,
      text,
      dueDate,
      deleteBtn
    );

    todoList.append(div);
  }
}