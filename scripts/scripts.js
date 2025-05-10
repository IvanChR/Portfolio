const menuIcon = document.querySelector("#openMenu")
const openMenu = () => {
  const mobileMenu = document.querySelector("#mobile-menu")
  mobileMenu.classList.toggle("hidden")
  console.log(true);

}
menuIcon.addEventListener("click", openMenu);