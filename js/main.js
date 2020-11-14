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

    for (let pinElement of pinElements) {
      pinElement.addEventListener(`click`, () => {
        const pinsAvatar = pinElement.querySelector(`img`).getAttribute(`src`);
        window.map.openCard(pinsAvatar);
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
    mainPin.removeEventListener(`keydown`, pressEnter);
    document.removeEventListener(`keydown`, window.form.pressEcsOnSuccess);
    document.removeEventListener(`keydown`, window.form.pressEcsOnError);
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
    window.pins = pins;
    addPinsToMap(pins);
    window.main.mainPin.removeEventListener(`mousedown`, window.move.trackMouse);
    activationСard();
  };

  const pressEnter = (evt) => {
    if (evt.key === `Enter`) {
      activationСard(window.backend.load(window.main.successLoadHandler, window.form.errorLoadHandler));
    }
  };

  mainPin.addEventListener(`keydown`, pressEnter);

  window.main = {
    mainPin,
    map,
    activationСard,
    successLoadHandler,
    addPinsToMap
  };

})();
