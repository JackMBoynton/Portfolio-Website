function animatedMenuBtn() {
  if (document.getElementById("menu-icon").className.includes("fa-rotate-90")) {
    document.getElementById("menu-icon").classList.remove("fa-rotate-90");
  } else {
    document.getElementById("menu-icon").classList += " fa-rotate-90";
  }
}
