'use strict';

(function () {

  const mapFilters = window.main.map.querySelector(`.map__filters-container`);
  const mapSelectFilters = mapFilters.querySelectorAll(`.map__filter`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const PIN_HALF_WIDTH = 23;
  const PIN_HEIGHT = 64;

  mapFilters.classList.add(`ad-form--disabled`);

  const renderPin = (pin) => {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = (pin.location.x - PIN_HALF_WIDTH) + `px`;
    pinElement.style.top = (pin.location.y - PIN_HEIGHT) + `px`;
    pinElement.setAttribute(`tabindex`, 0);
    pinElement.querySelector(`img`).setAttribute(`alt`, pin.offer.title);
    pinElement.querySelector(`img`).setAttribute(`src`, pin.author.avatar);
    return pinElement;
  };

  const openCard = (pinsAvatar) => {
    const cardPopup = document.querySelector(`.popup`);
    if (cardPopup !== null) {
      cardPopup.remove();
    }

    const cardsFragment = document.createDocumentFragment();
    for (let pin of window.pin.pins) {
      if (pin.author.avatar === pinsAvatar) {
        cardsFragment.appendChild(window.card.renderCard(pin));
      }
    }
    window.main.map.insertBefore(cardsFragment, window.map.mapFilters);
  };

  const closePopup = () => {
    const cardPopup = document.querySelector(`.popup`);
    const popupClose = document.querySelector(`.popup__close`);
    popupClose.addEventListener(`click`, function () {
      cardPopup.remove();
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        cardPopup.remove();
      }
    });
  };

  window.map = {
    mapFilters,
    mapSelectFilters,
    renderPin,
    openCard,
    closePopup
  };

})();
