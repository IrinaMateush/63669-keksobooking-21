'use strict';

(() => {
  const PIN_HALF_WIDTH = 23;
  const PIN_HEIGHT = 64;
  const mapFilters = window.main.map.querySelector(`.map__filters-container`);
  const mapSelectFilters = mapFilters.querySelectorAll(`.map__filter`);
  const mapCheckboxFilters = mapFilters.querySelectorAll(`.map__checkbox`);
  const mapLabelFilters = mapFilters.querySelectorAll(`.map__feature`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

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

  const openAdvertising = (pinsAvatar) => {
    const cardPopup = document.querySelector(`.popup`);

    if (cardPopup !== null) {
      cardPopup.remove();
    }

    const cardsFragment = document.createDocumentFragment();

    for (const pin of window.data.pins) {
      if (pin.author.avatar === pinsAvatar) {
        cardsFragment.appendChild(window.card.renderAdvertising(pin));
      }
    }
    window.main.map.insertBefore(cardsFragment, window.map.mapFilters);
  };

  const closePopup = () => {
    const cardPopup = document.querySelector(`.popup`);
    const popupClose = document.querySelector(`.popup__close`);
    popupClose.addEventListener(`click`, () => {
      cardPopup.remove();
    });

    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        cardPopup.remove();
      }
    });

  };

  window.map = {
    mapFilters,
    mapSelectFilters,
    mapCheckboxFilters,
    renderPin,
    openAdvertising,
    mapLabelFilters,
    closePopup
  };

})();
