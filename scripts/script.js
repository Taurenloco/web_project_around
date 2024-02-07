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

// Funciones

// funcion para validar el formulario de modal y addNewCardModal

function isValid(form) {
  const inputList = Array.from(
    form.querySelectorAll(".modal__contenido-nombre, .modal__contenido-enlace")
  );
  return inputList.every((item) => {
    return item.validity.valid;
  });
}

function isValidNew(formaddNewCardModal) {
  const inputList = Array.from(
    formaddNewCardModal.querySelectorAll(
      ".addNewCardModal__contenido-nombre, .addNewCardModal__contenido-enlace"
    )
  );
  return inputList.every((item) => {
    return item.validity.valid;
  });
}

function createCard(Card) {
  const nuevaCard = document
    .querySelector(".template-card")
    .content.querySelector(".cartas__contenedor")
    .cloneNode(true);

  nuevaCard.querySelector(".img1").src = Card.link;
  nuevaCard.querySelector(".cartas__contenedor-texto").textContent = Card.name;

  // Añadir el controlador de eventos al botón de "like"
  const botonLike = nuevaCard.querySelector(".like");
  agregarEventoLike(botonLike);

  // Añadir el controlador de eventos al botón de "eliminar"
  const botonEliminar = nuevaCard.querySelector(
    ".cartas__contenedor-botoneliminar"
  );
  agregarEventoEliminar(botonEliminar);

  // Añadir el controlador de eventos a la imagen
  const imagen = nuevaCard.querySelector(".img1");
  imagen.addEventListener("click", function () {
    abrirModalImagen(imagen.src, Card.name);
  });

  return nuevaCard;
}

function agregarCardsIniciales() {
  // Añadir las Cards de initialCards
  initialCards.forEach(function (Card) {
    const nuevaCard = createCard(Card);
    contenedorCards.append(nuevaCard);
  });
}

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

function abrirModalImagen(imagen, nombre) {
  if (modalImagen) {
    imagenModal.src = imagen;
    nombreModal.textContent = nombre;
    modalImagen.classList.add("modal_imagen_show");
  } else {
    console.error("El elemento modalImagen no está definido.");
  }
}

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

//Valida el formulario de modal

form.addEventListener("input", (event) => {
  const target = event.target;
  const errorNode = form.querySelector(
    `.modal__contenido-error_${target.name}`
  );
  console.log(errorNode);
  if (target.validity.valid) {
    target.classList.remove("modal__contenido-error");
    errorNode.textContent = "";
  } else {
    target.classList.add("modal__contenido-error");
    errorNode.textContent = target.validationMessage;
  }

  submitButton.disabled = !isValid(form);
});

//Valida el formulario de addNewCardModal

formaddNewCardModal.addEventListener("input", (event) => {
  const target = event.target;
  const errorNode = formaddNewCardModal.querySelector(
    `.modal__contenido-error_${target.name}`
  );
  console.log(errorNode);
  if (target.validity.valid) {
    target.classList.remove("modal__contenido-error");
    errorNode.textContent = "";
  } else {
    target.classList.add("modal__contenido-error");
    errorNode.textContent = target.validationMessage;
  }

  submitButtonNew.disabled = !isValidNew(formaddNewCardModal);
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
