'use strict';

(function () {
  const mainPin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);

  const activationСard = () => {
    map.classList.remove(`map--faded`);
    window.map.mapFilters.classList.remove(`ad-form--disabled`);
    window.form.noticeForm.classList.remove(`ad-form--disabled`);
    window.form.noticeAvatar.removeAttribute(`disabled`, `disabled`);
    window.form.activateForm(window.map.mapSelectFilters);
    window.form.activateForm(window.form.addFormElements);
    window.form.noticeAddress.setAttribute(`value`, window.move.mainPinCenterX + `, ` + window.move.mainPinTailY);

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

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      activationСard();
    }
  });

  window.main = {
    mainPin,
    map,
    activationСard: activationСard
  };

})();
