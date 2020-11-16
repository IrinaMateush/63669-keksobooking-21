'use strict';

(() => {
  const PINS_COUNT = 5;
  const orangePin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  const pinListElement = document.querySelector(`.map__pins`);

  const addPinsToMap = (pins) => {
    const pinsFragment = document.createDocumentFragment();
    const pinsCount = pins.length < PINS_COUNT ? pins.length : PINS_COUNT;

    for (let i = 0; i < pinsCount; i++) {
      pinsFragment.appendChild(window.map.renderPin(pins[i]));
    }

    pinListElement.appendChild(pinsFragment);

    const pinElements = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    window.pinElements = pinElements;

    for (const pinElement of pinElements) {
      pinElement.addEventListener(`click`, () => {
        const pinsAvatar = pinElement.querySelector(`img`).getAttribute(`src`);
        window.map.openAdvertising(pinsAvatar);
        const cardPopup = document.querySelector(`.popup`);
        const popupClose = cardPopup.querySelector(`.popup__close`);
        popupClose.addEventListener(`click`, pressCrossHandler);
      });

    }
  };

  const pressCrossHandler = () => {
    const cardPopup = document.querySelector(`.popup`);
    window.map.closePopup(cardPopup);
  };

  const activationСard = () => {
    orangePin.removeEventListener(`keydown`, pressEnterHandler);
    document.removeEventListener(`keydown`, window.form.successEscPressHandler);
    document.removeEventListener(`keydown`, window.form.errorEscPressHandler);
    map.classList.remove(`map--faded`);
    window.map.filtersContainer.classList.remove(`ad-form--disabled`);
    window.form.noticeBlank.classList.remove(`ad-form--disabled`);
    window.form.noticeAvatar.removeAttribute(`disabled`, `disabled`);
    window.form.noticeDescription.removeAttribute(`disabled`, `disabled`);
    window.form.activateFields(window.map.selectFilters);
    window.form.activateFields(window.map.checkboxFilters);
    window.form.activateFields(window.form.noticeInputs);
    window.form.activateFields(window.form.noticeSelects);
    window.form.changeCursorPointer(window.map.selectFilters);
    window.form.changeCursorPointer(window.map.labelFilters);
    window.form.noticeAddress.setAttribute(`value`, window.move.orangePinCenterX + `, ` + window.move.orangePinTailY);
  };

  const successLoadHandler = (pins) => {
    window.data.pins = pins;
    addPinsToMap(window.data.pins);
    window.main.orangePin.removeEventListener(`click`, window.move.pinsHandler);
    activationСard();
  };

  const pressEnterHandler = (evt) => {
    if (evt.key === `Enter`) {
      activationСard(window.backend.workWithServer(`GET`, window.backend.LOAD_URL, window.main.successLoadHandler));
    }
  };

  orangePin.addEventListener(`keydown`, pressEnterHandler);

  window.main = {
    orangePin,
    map,
    activationСard,
    successLoadHandler,
    addPinsToMap,
    pressCrossHandler
  };

})();
