import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Datos iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Selectores
const abrirmodal = document.querySelector(".button");
const modal = document.querySelector(".modal");
const cerrarmodal = document.querySelector(".modal__cerraricon");
const abriraddNewCardModal = document.querySelector(".buttonNewPlace__image");
const addNewCardModal = document.querySelector(".addNewCardModal");
const cerraraddNewCardModal = document.querySelector(
  ".addNewCardModal__cerraricon"
);
const formaddNewCardModal = document.querySelector(".addNewCardModal__form");
const contenedorCards = document.querySelector(".cartas");
const modalImagen = document.querySelector(".modal-imagen");
const imagenModal = modalImagen.querySelector(".modal-imagen__imagen");
const nombreModal = modalImagen.querySelector(".modal-imagen__nombre");
const cerrarModalImagen = modalImagen.querySelector(".modal-imagen__cerrar");
const form = document.querySelector(".modal__form");
const submitButtonNew = document.querySelector(
  ".addNewCardModal__contenido-crear"
);
const submitButton = form.querySelector(".modal__contenido-crear");
// const overlays = document.querySelectorAll(
//   ".modal, .addNewCardModal, .modal-imagen, .modalOverlay"
// );
const overlays = document.querySelectorAll(".modalOverlay");




// Eventos

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtén los valores de los campos "Titulo" y "Acerca de mi"
  const titulo = form.elements["title"].value;
  const aboutme = form.elements["about"].value;

  // Selecciona los elementos h1 y h3
  const nombrePagina = document.querySelector(".contenedor__titulos-nombre");
  const subtituloPagina = document.querySelector(
    ".contenedor__titulos-subtitulo"
  );

  // Reemplaza el contenido de los elementos h1 y h3 con los valores de los campos "Titulo" y "Acerca de mi"
  nombrePagina.textContent = titulo;
  subtituloPagina.textContent = aboutme;

  // Aquí va el resto de tu código para manejar el envío del formulario
  modal.classList.remove("modal_show");
});







function agregarEventoLike(button) {
  button.addEventListener("click", function () {
    if (button.classList.contains("dislike")) {
      button.classList.remove("dislike");
    } else {
      button.classList.add("dislike");
    }
  });
}

function agregarEventoEliminar(button) {
  button.addEventListener("click", function () {
    const Card = button.closest(".cartas__contenedor");
    Card.remove();
  });
}



// Este código cierra la ventana emergente cuando se hace clic fuera de su contenido.
overlays.forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    if (event.target.classList.contains("modalOverlay")) {
      console.log("fs");
      event.target
        .closest("section")
        .classList.remove("modal_show", "modal_imagen_show");
    }
  });
});

// Este código cierra la ventana emergente cuando press ESC.

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    // Obtén todas las ventanas emergentes que están actualmente abiertas
    const modals = document.querySelectorAll(".modal_show, .modal_imagen_show");

    // Cierra todas las ventanas emergentes
    modals.forEach((modal) => {
      modal.classList.remove("modal_show", "modal_imagen_show");
    });
  }
});



abrirmodal.addEventListener("click", (e) => {
  e.preventDefault();
  // Para abrir el modal
  modal.classList.add("modal_show");
});

cerrarmodal.addEventListener("click", () => {
  modal.classList.remove("modal_show");
});

abriraddNewCardModal.addEventListener("click", (e) => {
  e.preventDefault();
  // Para abrir el addNewCardModa
  addNewCardModal.classList.add("modal_show");
});

cerraraddNewCardModal.addEventListener("click", () => {
  // Para cerrar el addNewCardModal
  addNewCardModal.classList.remove("modal_show");
});

formaddNewCardModal.addEventListener("submit", (e) => {
  e.preventDefault();

  // Crear la nueva Card
  const nuevaCard = createCard({
    name: formaddNewCardModal.elements["title"].value,
    link: formaddNewCardModal.elements["about"].value,
  });

  // Añadir la nueva Card al principio del contenedor de Cards
  contenedorCards.prepend(nuevaCard);

  // Cerrar el modal
  addNewCardModal.classList.remove("modal_show");
});

cerrarModalImagen.addEventListener("click", function () {
  modalImagen.classList.remove("modal_imagen_show");
});

// Inicialización
agregarCardsIniciales();
submitButton.disabled = !isValid(form);
submitButtonNew.disabled = !isValidNew(formaddNewCardModal);
