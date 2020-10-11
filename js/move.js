'use strict';

(function () {
  const LEFT_MOUSE_BUTTON = 1;

  const mainPinHalf = window.main.mainPin.getBoundingClientRect().width / 2;
  let mainPinCenterX = Math.round(window.main.mainPin.getBoundingClientRect().x + mainPinHalf);
  let mainPinCenterY = Math.round(window.main.mainPin.getBoundingClientRect().y + mainPinHalf);
  const MAIN_PIN_TAILS_HEIGHT = 22;
  let mainPinTailY = Math.round(mainPinCenterY + mainPinHalf + MAIN_PIN_TAILS_HEIGHT);

  const START_BORDER_Y = 130;
  const END_BORDER_Y = 630;
  const START_BORDER_X = window.main.map.getBoundingClientRect().x;
  const END_BORDER_X = window.main.map.getBoundingClientRect().right;

  window.main.mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    if (evt.which === LEFT_MOUSE_BUTTON) {

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (moveEvt.clientY <= START_BORDER_Y) {
          window.main.mainPin.style.top = START_BORDER_Y;
          window.main.mainPin.style.left = (window.main.mainPin.offsetLeft - shift.x) + `px`;
        } else if (moveEvt.clientY >= END_BORDER_Y) {
          window.main.mainPin.style.top = END_BORDER_Y;
          window.main.mainPin.style.left = (window.main.mainPin.offsetLeft - shift.x) + `px`;
        } else if (moveEvt.clientX <= START_BORDER_X) {
          window.main.mainPin.style.top = (window.main.mainPin.offsetTop - shift.y) + `px`;
          window.main.mainPin.style.left = START_BORDER_X + mainPinHalf;
        } else if (moveEvt.clientX >= END_BORDER_X) {
          window.main.mainPin.style.top = (window.main.mainPin.offsetTop - shift.y) + `px`;
          window.main.mainPin.style.right = END_BORDER_X - mainPinHalf;
        } else {
          window.main.mainPin.style.top = (window.main.mainPin.offsetTop - shift.y) + `px`;
          window.main.mainPin.style.left = (window.main.mainPin.offsetLeft - shift.x) + `px`;
        }
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
        mainPinCenterX = Math.round(window.main.mainPin.getBoundingClientRect().x + mainPinHalf);
        mainPinCenterY = Math.round(window.main.mainPin.getBoundingClientRect().y + mainPinHalf);
        mainPinTailY = Math.round(mainPinCenterY + mainPinHalf + MAIN_PIN_TAILS_HEIGHT);
        window.form.noticeAddress.setAttribute(`value`, mainPinCenterX + `, ` + mainPinTailY);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
      window.main.activationСard();
    }
  });

  window.move = {
    mainPinTailY,
    mainPinCenterX,
    mainPinCenterY
  };

})();
