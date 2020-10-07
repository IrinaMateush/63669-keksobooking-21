'use strict';

(function () {
  const mainPin = document.querySelector(`.map__pin--main`);
  const mainPinHalf = mainPin.getBoundingClientRect().width / 2;
  const mainPinCenterX = Math.round(mainPin.getBoundingClientRect().x + mainPinHalf);
  const mainPinCenterY = Math.round(mainPin.getBoundingClientRect().y + mainPinHalf);
  const MAIN_PIN_TAILS_HEIGHT = 22;
  const mainPinTailY = Math.round(mainPinCenterY + mainPinHalf + MAIN_PIN_TAILS_HEIGHT);

  const LEFT_MOUSE_BUTTON = 1;

  const map = document.querySelector(`.map`);

  window.main = {
    mainPin,
    map,
    mainPinCenterX,
    mainPinCenterY
  };

  const activationСard = () => {
    map.classList.remove(`map--faded`);
    window.map.mapFilters.classList.remove(`ad-form--disabled`);
    window.form.noticeForm.classList.remove(`ad-form--disabled`);
    window.form.noticeAvatar.removeAttribute(`disabled`, `disabled`);
    window.form.activateForm(window.map.mapSelectFilters);
    window.form.activateForm(window.form.addFormElements);
    window.form.noticeAddress.setAttribute(`value`, mainPinCenterX + `, ` + mainPinTailY);

    const pinsFragment = document.createDocumentFragment();
    for (let pin of window.pin.pins) {
      pinsFragment.appendChild(window.map.renderPin(pin));
    }
    window.pin.pinListElement.appendChild(pinsFragment);

    const pinElements = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let pinElement of pinElements) {
      pinElement.addEventListener(`click`, function () {
        const pinsAvatar = pinElement.querySelector(`img`).getAttribute(`src`);
        window.map.openCard(pinsAvatar);
        window.map.closePopup();
      });
    }
  };

  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === LEFT_MOUSE_BUTTON) {
      activationСard();
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      activationСard();
    }
  });

})();
