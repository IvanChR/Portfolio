import info from "./info.json" with {type: 'json'};

const name = document.querySelector(".about__name");
const profesion = document.querySelector(".about__position");
const abouMeInfo = document.querySelector(".about__description__text p");
const emails = document.querySelectorAll(".socialLinks .email");
const contactIcons = document.querySelectorAll(".socialLinks ul");
const projectContainer = document.querySelector(".projects__container");
const experienceContainer = document.querySelector(".experience__container");
const filterProjects = document.querySelector(".projects__filter");
const allProjects = info.projects;
const experience = info.experience


displayInfo();
displaySocialLink();
displayProjects(allProjects);
displayExperience(experience);
// displayFilterProjects();

// Imprime en pantalla la información de Aboutme
function displayInfo() {
  name.innerHTML = info?.data?.name ?? "Iván Chávez";
  profesion.innerHTML = info?.data?.profesion ?? "Artista 3D | Frontend Developer | Diseñador UI";
  abouMeInfo.innerHTML = info?.data?.info ?? "Soy un Artista 3D, Desarrollador frontend y Diseñador gráfico con más de 7 años de experiencia en diseño y 4 en desarrollo frontend.";
  emails.forEach(email => email.innerHTML = `${info?.data?.emailIcon} ${info?.data?.email ?? "contacto.ivanchr@gmail.com"}`);
}

// Imprime en pantalla los iconos de redes sociales
function displaySocialLink() {
  const icons = info.contact.map(icon =>
    `<li class="contact__icons">
            <a href="${icon.href}" target="_blank" rel="noopener noreferrer">
                ${icon.icon}
            </a>
       </li>`
  ).join("")

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
      `<button class="filter__button btn btn-ghost" type="button" data-id="${btnCategory}">${btnCategory}</button>`
    )
  }).join("")

  filterProjects.innerHTML = btnsFilter

  // Guarda los botones de filtro en una constante
  const filterButtons = document.querySelectorAll(".filter__button");

  filterButtons[0].classList.add("active");

  filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const category = e.currentTarget.dataset.id

      removeActiveClass(filterButtons)
      button.classList.add("active")

      // Comprueba primero si está mostrando los elementos antes de procesar los filtrados
      if (category === "All") {
        displayProjects(allProjects)
        return
      }

      const projectsCategory = info.projects.filter(project => {
        if (project.category === category) {
          return project
        }
      })

      displayProjects(projectsCategory)

    })
  })
}

// Imprime la experience
function displayExperience(experienceItems) {
  let experienceHistory = experienceItems.map(experienceCard =>
    `<div class="experience__item flex-col md:flex-row">
          <div class="experience__date">
            <span class="text-left md:text-right">${experienceCard.date}</span>
          </div>
          <div class="experience__description">
            <h4 class="experience__title">${experienceCard.title}</h4>
            <p class="experience__company">${experienceCard.company}</p>
            <p class="experience__text">${experienceCard.description}</p>
          </div>
     </div>`
  ).join("");

  experienceContainer.innerHTML = experienceHistory
}



function displayProjects(projectItems) {
  const webIcon = `<i class="fas text-xl fa-globe"></i>`;
  const isDisplayNone = document.querySelector(".btn-ghost").classList.add(".d-none")

  let projects = projectItems.map(project =>
    `
    <div class="project__item">
          <div class="project__image">
            <img src="${project.image}" 
            alt="${project.title}"
            class="image-project"/>
          </div>
          <div class="project__info">
            <h4 class="project__title">${project.title}</h4>
            <p class="project__description">Descripción</p>
            <small>Tecnologías</small>
          </div>
          <div class="project__links">
            ${project.link
      ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost py-3 px-5 me-2 inline-block"> ${webIcon} </a>`
      : ""}
            ${project.artstation
      ? `<a href="${project.artstation}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost py-3 px-5 me-2 inline-block"> ${info.contact[0].icon} </a>`
      : ""}
                    
                    ${project.behance
      ? `<a href="${project.behance}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost py-3 px-5 me-2 inline-block"> ${info.contact[2].icon} </a>`
      : ""}
      <button class="btn btn-ghost py-3 px-5">Ver proyecto</button>
            <a href="#" rel="noopener noreferrer" target="_blank" class="project__link">
              <i class="fas fa-external-link-square-alt text-xl"></i>
            </a>
                </div>
        </div>`
  ).join("");

  projectContainer.innerHTML = projects
}

function removeActiveClass(items) {
  items.forEach(item => {
    item.classList.remove("active")
  })
}

const goUp = document.querySelector(".goUp");
goUp.addEventListener("click", scrollToTop)

function scrollToTop() {
  const rootElement = document.documentElement
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
  // rootElement.scrollTo(0,0)
}
