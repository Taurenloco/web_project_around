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

//crear Card

function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  return card.generateCard();
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

function abrirModalImagen(imagen, nombre) {
  if (modalImagen) {
    imagenModal.src = imagen;
    nombreModal.textContent = nombre;
    modalImagen.classList.add("modal_imagen_show");
  } else {
    console.error("El elemento modalImagen no está definido.");
  }
}

// Card
export default class Card {
  constructor(data, templateSelector) {
    this.data = data;
    this.templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this.templateSelector)
      .content.querySelector(".cartas__contenedor")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this.element.querySelector(".like").addEventListener("click", function () {
      this.classList.toggle("dislike");
    });

    this.element
      .querySelector(".cartas__contenedor-botoneliminar")
      .addEventListener("click", function () {
        this.closest(".cartas__contenedor").remove();
      });

    this.element.querySelector(".img1").addEventListener("click", function () {
      abrirModalImagen(this.src, this.alt);
    });
  }

  generateCard() {
    this.element = this._getTemplate();
    this._setEventListeners();

    this.element.querySelector(".img1").src = this.data.link;
    this.element.querySelector(".img1").alt = this.data.name;
    this.element.querySelector(".cartas__contenedor-texto").textContent =
      this.data.name;

    return this.element;
  }
}
