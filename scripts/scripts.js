import info from "./info.json" assert {type: 'json'}

const name = document.querySelector(".about__name")
const profesion = document.querySelector(".about__position")
const abouMeInfo = document.querySelector(".about__description__text p")
const emails = document.querySelectorAll(".socialLinks .email")
const contactIcons = document.querySelectorAll(".socialLinks ul")
const projectContainer = document.querySelector(".projects__container")
const filterProjects = document.querySelector(".projects__filter")
const allProjects = info.projects

displayInfo()
displaySocialLink()
displayProjects(allProjects)
displayFilterProjects()

// Imprime en pantalla la información de Aboutme
function displayInfo() {

  name.innerHTML = info?.data?.name
  profesion.innerHTML = info?.data?.profesion
  abouMeInfo.innerHTML = info?.data?.info
  emails.forEach(email => email.innerHTML = `${info?.data?.emailIcon} ${info?.data?.email}`)
}

// Imprime en pantalla los iconos de redes sociales
function displaySocialLink() {
  const icons = info.contact.map(icon => {
    return (
      `<li class="contact__icons">
                <a href="${icon.href}" target="_blank" rel="noopener noreferrer">
                    ${icon.icon}
                </a>
            </li>`
    )
  }).join("")

  return contactIcons.forEach(contact => contact.innerHTML = icons)
}

function displayFilterProjects() {
  const categories = info.projects.reduce((values, item) => {


    if (!values.includes(item.category)) {
      values.push(item.category)
    }
    return values
  }, ["All"])

  const btnsFilter = categories.map(btnCategory => {
    return (
      `
      <button class="filter__button btn btn-ghost" type="button" data-id="${btnCategory}">${btnCategory}</button>
      `
    )
  }).join("")

  filterProjects.innerHTML = btnsFilter

  // Guarda los botones de filtro en una constante
  const filterButtons = document.querySelectorAll(".filter__button")



  filterButtons[0].classList.add("active")
  filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const category = e.currentTarget.dataset.id

      removeActiveClass(filterButtons)
      button.classList.add("active")

      const projectsCategory = info.projects.filter(project => {
        if (project.category === category) {
          return project
        }
      })

      if (category === "All") {
        displayProjects(allProjects)
      } else {
        displayProjects(projectsCategory)
      }


    })
  })

}



// Imprime los proyectos en pantalla
function displayProjects(projectItems) {
  let projects = projectItems.map(project => {
    return (

      `
            <div class="project__item">
            <div class="project__image">
              <img
                src="${project.image}"
                alt="${project.title}"
                class="image-project"
              />
            </div>
            <div class="project__info">
              <small>${project.category}</small>
              <h4 class="project__title">${project.title}</h4>
              <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost"> Ver proyecto </a>
            </div>
          </div>
            `
    )
  }).join("")

  projectContainer.innerHTML = projects
}

function removeActiveClass(items) {

  items.forEach(item => {
    item.classList.remove("active")
  })

}
