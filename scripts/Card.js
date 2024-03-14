
export default class Card {
  constructor(link, name, templateSelector, handleCardClick) {
    this.link = link;
    this.name = name;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this.templateSelector)
      .content.querySelector(".cards__container")
      .cloneNode(true);

    //name
    const nameNode = cardElement.querySelector(".cards__container-text");
    nameNode.textContent = this.name;
    //link
    const linkNode = cardElement.querySelector(".img1");
    linkNode.src = this.link;

    return cardElement;
  }

  _setEventListeners() {
    // Añadir el controlador de eventos al botón de "like"
    const botonLike = this._element.querySelector(".like");
    botonLike.addEventListener("click", () => {
      botonLike.classList.toggle("dislike");
    });

    // Añadir el controlador de eventos al botón de "eliminar"
    const botonEliminar = this._element.querySelector(
      ".cards__container-botoneliminar"
    );
    botonEliminar.addEventListener("click", () => {
      const cardNode = botonEliminar.closest(".cards__container");
      cardNode.remove();
    });

    // Añadir el controlador de eventos a la imagen
    const imagen = this._element.querySelector(".img1");
    imagen.addEventListener("click", () => {
      this.handleCardClick(this.link, this.name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    return this._element;
  }
}
