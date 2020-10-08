'use strict';

(function () {
  const MIN_Y = 130;
  const MAX_Y = 630;
  const MIN_PRICE = 1;
  const MAX_PRICE = 10000;
  const MIN_ROOMS = 1;
  const MAX_ROOMS = 10;
  const MIN_GUESTS = 1;
  const MAX_GUESTS = 10;
  const PINS_COUNT = 8;
  const pinListElement = document.querySelector(`.map__pins`);

  const MIN_X = pinListElement.getBoundingClientRect().x;
  const MAX_X = pinListElement.getBoundingClientRect().width;

  const getArrayPins = (pinsCount) => {
    const pins = [];

    for (let i = 0; i < pinsCount; i++) {
      const x = window.data.getRandomInt(MIN_X, MAX_X);
      const y = window.data.getRandomInt(MIN_Y, MAX_Y);
      const photoIndex = i + 1;

      pins.push({
        'author': {
          'avatar': `img/avatars/user0` + photoIndex + `.png`,
        },
        'offer': {
          'title': `Шикарное предложение!`,
          'address': x + `, ` + y,
          'price': window.data.getRandomInt(MIN_PRICE, MAX_PRICE),
          'type': window.data.TYPES[window.data.getRandomInt(0, window.data.TYPES.length - 1)],
          'rooms': window.data.getRandomInt(MIN_ROOMS, MAX_ROOMS),
          'guests': window.data.getRandomInt(MIN_GUESTS, MAX_GUESTS),
          'checkin': window.data.CHECKIN[window.data.getRandomInt(0, window.data.CHECKIN.length - 1)],
          'checkout': window.data.CHECKOUT[window.data.getRandomInt(0, window.data.CHECKOUT.length - 1)],
          'features': window.data.getFeatures(window.data.FEATURES),
          'description': `Номер с видом на море`,
          'photos': window.data.getArrayRandomLength(window.data.PHOTOS),
        },
        'location': {
          'x': x,
          'y': y,
        },
      });
    }
    return pins;
  };

  const pins = getArrayPins(PINS_COUNT);

  window.pin = {
    pins,
    pinListElement
  };

})();
