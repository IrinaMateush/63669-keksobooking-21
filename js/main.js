'use strict';

(() => {
  const PINS_COUNT = 5;
  const mainPin = document.querySelector(`.map__pin--main`);
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
        window.map.closePopup();

        document.removeEventListener(`keydown`, (evt) => {
          if (evt.key === `Escape`) {
            evt.preventDefault();
          }
        });
      });
    }
  };

  const activationСard = () => {
    mainPin.removeEventListener(`keydown`, pressEnterHandler);
    document.removeEventListener(`keydown`, window.form.successEscPressHandler);
    document.removeEventListener(`keydown`, window.form.errorEscPressHandler);
    map.classList.remove(`map--faded`);
    window.map.mapFilters.classList.remove(`ad-form--disabled`);
    window.form.noticeForm.classList.remove(`ad-form--disabled`);
    window.form.noticeAvatar.removeAttribute(`disabled`, `disabled`);
    window.form.addFormDescription.removeAttribute(`disabled`, `disabled`);
    window.form.activateForm(window.map.mapSelectFilters);
    window.form.activateForm(window.map.mapCheckboxFilters);
    window.form.activateForm(window.form.addFormInputs);
    window.form.activateForm(window.form.addFormSelects);
    window.form.changeCursorPointer(window.map.mapSelectFilters);
    window.form.changeCursorPointer(window.map.mapLabelFilters);
    window.form.noticeAddress.setAttribute(`value`, window.move.mainPinCenterX + `, ` + window.move.mainPinTailY);
  };

  const successLoadHandler = (pins) => {
    window.data.pins = pins;
    addPinsToMap(window.data.pins);
    window.main.mainPin.removeEventListener(`click`, window.move.getPinsHandler);
    activationСard();
  };

  const pressEnterHandler = (evt) => {
    if (evt.key === `Enter`) {
      activationСard(window.backend.workWithServer(`GET`, window.backend.LOAD_URL, window.main.successLoadHandler));
    }
  };

  mainPin.addEventListener(`keydown`, pressEnterHandler);

  window.main = {
    mainPin,
    map,
    activationСard,
    successLoadHandler,
    addPinsToMap
  };

})();
