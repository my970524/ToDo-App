"use strict";
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const TODOS = "todos";
let todos = [];

function loadTodo() {
  const loadedTodos = localStorage.getItem(TODOS);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach(function (todo) {
      paintTodo(todo.text);
    });
  }
}

todoForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const todoValue = todoInput.value;
  paintTodo(todoValue);
  todoInput.value = "";
}

function paintTodo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", handleClick);
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  todoList.appendChild(li);

  const newId = todos.length + 1;
  li.id = newId;
  const todoObj = {
    text: text,
    id: newId,
  };
  todos.push(todoObj);
  saveTodos(todos);
}

function saveTodos(todos) {
  localStorage.setItem(TODOS, JSON.stringify(todos));
}

function handleClick(event) {
  const btn = event.target;
  const li = btn.parentElement;

  todoList.removeChild(li);
  const cleanedTodos = todos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  todos = cleanedTodos;
  saveTodos(todos);
}

loadTodo();
