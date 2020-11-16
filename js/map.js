'use strict';

const PIN_HALF_WIDTH = 23;
const PIN_HEIGHT = 64;
const filtersContainer = window.main.map.querySelector(`.map__filters-container`);
const selectFilters = filtersContainer.querySelectorAll(`.map__filter`);
const checkboxFilters = filtersContainer.querySelectorAll(`.map__checkbox`);
const labelFilters = filtersContainer.querySelectorAll(`.map__feature`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

filtersContainer.classList.add(`ad-form--disabled`);

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
  window.main.map.insertBefore(cardsFragment, window.map.filtersContainer);
  document.addEventListener(`keydown`, pressEcsOnPopupHandler);
};

const closePopup = (popup) => {
  const popupClose = popup.querySelector(`.popup__close`);
  popup.remove();
  document.removeEventListener(`keydown`, pressEcsOnPopupHandler);
  popupClose.removeEventListener(`click`, window.main.pressCrossHandler);
};

window.main.orangePin.addEventListener(`click`, window.move.pinsHandler);

const pressEcsOnPopupHandler = (evt) => {
  const cardPopup = document.querySelector(`.popup`);
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup(cardPopup);
  }
};

window.map = {
  filtersContainer,
  selectFilters,
  checkboxFilters,
  labelFilters,
  renderPin,
  closePopup,
  openAdvertising
};
