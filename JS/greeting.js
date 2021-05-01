"use strict";

const userForm = document.querySelector(".user-form");
const userInput = document.querySelector(".user-input");
const greeting = document.querySelector(".user-greeting");
const USER = "user";
const showClass = "show";

function loadUser() {
  const currentUser = localStorage.getItem(USER);
  if (currentUser === null) {
    askName();
  } else {
    showGreeting(currentUser);
  }
}

function askName() {
  userForm.classList.add(showClass);
  userForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault();
  const userValue = userInput.value;
  saveUser(userValue);
  showGreeting(userValue);
}

function saveUser(user) {
  localStorage.setItem(USER, user);
}

function showGreeting(user) {
  userForm.classList.remove(showClass);
  greeting.classList.add(showClass);
  greeting.innerText = `Hello ${user}!`;
}

loadUser();
