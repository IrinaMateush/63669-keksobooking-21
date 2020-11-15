'use strict';

(() => {
  const LEFT_MOUSE_BUTTON = 1;
  const START_BORDER_Y = 130;
  const END_BORDER_Y = 630;
  const START_BORDER_X = window.main.map.offsetLeft;
  const END_BORDER_X = window.main.map.offsetWidth + START_BORDER_X;
  const MAIN_PIN_TAILS_HEIGHT = 22;

  const orangePinHalf = window.main.orangePin.offsetWidth / 2;

  const getCoords = (elem) => {
    const box = elem.getBoundingClientRect();

    return {
      top: Math.round(box.top + pageYOffset),
      left: Math.round(box.left + pageXOffset)
    };
  };

  const orangePinPositionX = getCoords(window.main.orangePin).left - START_BORDER_X;
  const orangePinPositionY = getCoords(window.main.orangePin).top;
  let orangePinCenterX = Math.round(getCoords(window.main.orangePin).left + orangePinHalf);
  let orangePinCenterY = Math.round(getCoords(window.main.orangePin).top + orangePinHalf);
  let orangePinTailY = Math.round(orangePinCenterY + orangePinHalf + MAIN_PIN_TAILS_HEIGHT);

  const getPinsHandler = () => {
    window.main.activationСard(window.backend.workWithServer(`GET`, window.backend.LOAD_URL, window.main.successLoadHandler));
  };

  window.main.orangePin.addEventListener(`click`, getPinsHandler);

  window.main.orangePin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    if (evt.which === LEFT_MOUSE_BUTTON) {

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const moveMouseHandler = (moveEvt) => {
        moveEvt.preventDefault();

        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let orangePinTop = window.main.orangePin.offsetTop - shift.y;
        let orangePinLeft = window.main.orangePin.offsetLeft - shift.x;
        let pinBorderRight = orangePinLeft + START_BORDER_X + orangePinHalf;

        if (orangePinLeft <= -orangePinHalf) {
          orangePinLeft = -orangePinHalf;
        } else if (pinBorderRight >= END_BORDER_X) {
          orangePinLeft = END_BORDER_X - START_BORDER_X - orangePinHalf;
        }

        if (orangePinTop <= START_BORDER_Y) {
          orangePinTop = START_BORDER_Y;
        } else if (orangePinTop >= END_BORDER_Y) {
          orangePinTop = END_BORDER_Y;
        }

        window.main.orangePin.style.top = orangePinTop + `px`;
        window.main.orangePin.style.left = orangePinLeft + `px`;

        orangePinCenterX = Math.round(window.main.orangePin.getBoundingClientRect().x + orangePinHalf);
        orangePinCenterY = Math.round(window.main.orangePin.getBoundingClientRect().y + orangePinHalf);
        orangePinTailY = Math.round(orangePinCenterY + orangePinHalf + MAIN_PIN_TAILS_HEIGHT);
        window.form.noticeAddress.setAttribute(`value`, orangePinCenterX + `, ` + orangePinTailY);
      };

      const upMouseHandler = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, moveMouseHandler);
        document.removeEventListener(`mouseup`, upMouseHandler);
      };

      document.addEventListener(`mousemove`, moveMouseHandler);
      document.addEventListener(`mouseup`, upMouseHandler);
    }
  });

  window.move = {
    orangePinTailY,
    getPinsHandler,
    orangePinCenterX,
    orangePinCenterY,
    orangePinPositionX,
    orangePinPositionY
  };

})();
