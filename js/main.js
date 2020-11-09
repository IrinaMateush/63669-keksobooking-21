'use strict';

(function () {
  const mainPin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  const pinListElement = document.querySelector(`.map__pins`);

  const PINS_COUNT = 5;

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
      pinElement.addEventListener(`click`, function () {
        const pinsAvatar = pinElement.querySelector(`img`).getAttribute(`src`);
        window.map.openCard(pinsAvatar);
        window.map.closePopup();
      });
    }
  };

  const activationСard = () => {
    map.classList.remove(`map--faded`);
    window.map.mapFilters.classList.remove(`ad-form--disabled`);
    window.form.noticeForm.classList.remove(`ad-form--disabled`);
    window.form.noticeAvatar.removeAttribute(`disabled`, `disabled`);
    window.form.addFormDescription.removeAttribute(`disabled`, `disabled`);
    window.form.activateForm(window.map.mapSelectFilters);
    window.form.activateForm(window.map.mapСheckboxFilters);
    window.form.activateForm(window.form.addFormInputs);
    window.form.activateForm(window.form.addFormSelects);
    window.form.noticeAddress.setAttribute(`value`, window.move.mainPinCenterX + `, ` + window.move.mainPinTailY);
  };

  const successLoadHandler = (pins) => {
    window.pins = pins;
    addPinsToMap(pins);
    activationСard();
  };

  const errorLoadHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `fixed`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `25px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      activationСard(window.backend.load(window.main.successLoadHandler, window.main.errorLoadHandler));
    }
  });

  window.main = {
    mainPin,
    map,
    activationСard,
    successLoadHandler,
    errorLoadHandler,
    addPinsToMap
  };

})();
