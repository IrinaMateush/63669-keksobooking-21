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

  window.main.mainPin.addEventListener(`mousedown`, function (evt) { //нажатие мыши
    evt.preventDefault();
    if (evt.which === LEFT_MOUSE_BUTTON) {

      let startCoords = { //тут началось наше перемещение, слушаем нажатие мыши
        x: evt.clientX, // clientX, clientY положение мыши на экране от левого верхнего угла
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        const shift = { // вычисляем расстояние между начальными коотдинатами и координатами на которые сместился курсор
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = { //перезаписываем начальные коотдинаты после смещения
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        //offsetTop - возвращает расстояние текущего элемента по отношению к верхней части родителя.
        window.main.mainPin.style.top = (window.main.mainPin.offsetTop - shift.y) + `px`; //прописываем новое положение элемента отступ сверху относительно родителя - смещение по y
        window.main.mainPin.style.left = (window.main.mainPin.offsetLeft - shift.x) + `px`;
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

      document.addEventListener(`mousemove`, onMouseMove); //перемещение мыши, вызывается на движение в каждый пиксель
      document.addEventListener(`mouseup`, onMouseUp); //отжатие мыши
      window.main.activationСard();
    }
  });

  window.move = {
    mainPinTailY,
    mainPinCenterX,
    mainPinCenterY
  };

})();
