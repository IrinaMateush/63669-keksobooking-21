'use strict';

(() => {
  const LEFT_MOUSE_BUTTON = 1;
  const START_BORDER_Y = 130;
  const END_BORDER_Y = 630;
  const START_BORDER_X = window.main.map.offsetLeft;
  const END_BORDER_X = window.main.map.offsetWidth + START_BORDER_X;

  const mainPinHalf = window.main.mainPin.offsetWidth / 2;
  let mainPinCenterX = Math.round(window.main.mainPin.getBoundingClientRect().left + mainPinHalf);
  let mainPinCenterY = Math.round(window.main.mainPin.getBoundingClientRect().top + mainPinHalf);
  const MAIN_PIN_TAILS_HEIGHT = 22;
  let mainPinTailY = Math.round(mainPinCenterY + mainPinHalf + MAIN_PIN_TAILS_HEIGHT);

  window.main.mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    if (evt.which === LEFT_MOUSE_BUTTON) {

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let mainPinTop = window.main.mainPin.offsetTop - shift.y;
        let mainPinLeft = window.main.mainPin.offsetLeft - shift.x;
        let pinBorderRight = mainPinLeft + START_BORDER_X + mainPinHalf;

        if (mainPinLeft <= -mainPinHalf) {
          mainPinLeft = -mainPinHalf;
        } else if (pinBorderRight >= END_BORDER_X) {
          mainPinLeft = END_BORDER_X - START_BORDER_X - mainPinHalf;
        }

        if (mainPinTop <= START_BORDER_Y) {
          mainPinTop = START_BORDER_Y;
        } else if (mainPinTop >= END_BORDER_Y) {
          mainPinTop = END_BORDER_Y;
        }

        window.main.mainPin.style.top = mainPinTop + `px`;
        window.main.mainPin.style.left = mainPinLeft + `px`;

        mainPinCenterX = Math.round(window.main.mainPin.getBoundingClientRect().x + mainPinHalf);
        mainPinCenterY = Math.round(window.main.mainPin.getBoundingClientRect().y + mainPinHalf);
        mainPinTailY = Math.round(mainPinCenterY + mainPinHalf + MAIN_PIN_TAILS_HEIGHT);
        window.form.noticeAddress.setAttribute(`value`, mainPinCenterX + `, ` + mainPinTailY);
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);

      window.main.activationСard(window.backend.load(window.main.successLoadHandler, window.main.errorLoadHandler));
    }
  });

  window.move = {
    mainPinTailY,
    mainPinCenterX,
    mainPinCenterY
  };

})();
