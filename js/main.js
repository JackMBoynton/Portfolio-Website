function animatedMenuBtn() {
  if (document.getElementById("menu-icon").className.includes("fa-times")) {
    document.getElementById("menu-icon").className = "fas fa-bars";
  } else {
    document.getElementById("menu-icon").className = "fas fa-times";
  }
}
