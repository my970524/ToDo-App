"use strict";

const logoutBtn = document.querySelector(".logout button");

logoutBtn.addEventListener("click", handleClick);

function handleClick(event) {
  localStorage.removeItem("user");
  greeting.classList.remove("show");
  userForm.classList.add("show");
  userInput.value = "";
}
