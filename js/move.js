'use strict';

(() => {
  const LEFT_MOUSE_BUTTON = 1;
  const START_BORDER_Y = 130;
  const END_BORDER_Y = 630;
  const START_BORDER_X = window.main.map.offsetLeft;
  const END_BORDER_X = window.main.map.offsetWidth + START_BORDER_X;
  const MAIN_PIN_TAILS_HEIGHT = 22;

  const mainPinHalf = window.main.mainPin.offsetWidth / 2;

  const getCoords = (elem) => {
    const box = elem.getBoundingClientRect();

    return {
      top: Math.round(box.top + pageYOffset),
      left: Math.round(box.left + pageXOffset)
    };
  };

  const mainPinPositionX = getCoords(window.main.mainPin).left - START_BORDER_X;
  const mainPinPositionY = getCoords(window.main.mainPin).top;
  let mainPinCenterX = Math.round(getCoords(window.main.mainPin).left + mainPinHalf);
  let mainPinCenterY = Math.round(getCoords(window.main.mainPin).top + mainPinHalf);
  let mainPinTailY = Math.round(mainPinCenterY + mainPinHalf + MAIN_PIN_TAILS_HEIGHT);

  const getPins = () => {
    window.main.activationСard(window.backend.workWithServer(`GET`, window.backend.LOAD_URL, window.main.successLoadHandler));
  };

  window.main.mainPin.addEventListener(`click`, getPins);

  window.main.mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    if (evt.which === LEFT_MOUSE_BUTTON) {

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const moveMouse = (moveEvt) => {
        moveEvt.preventDefault();

        const shift = {
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

      const upMouse = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, moveMouse);
        document.removeEventListener(`mouseup`, upMouse);
      };

      document.addEventListener(`mousemove`, moveMouse);
      document.addEventListener(`mouseup`, upMouse);
    }
  });

  window.move = {
    mainPinTailY,
    getPins,
    mainPinCenterX,
    mainPinCenterY,
    mainPinPositionX,
    mainPinPositionY
  };

})();
