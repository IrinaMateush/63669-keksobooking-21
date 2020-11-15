'use strict';

(() => {

  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const TYPES = [`palace`, `flat`, `house`, `bungalo`];
  const CHECKINTIMES = [`12:00`, `13:00`, `14:00`];
  const CHECKOUTTIMES = [`12:00`, `13:00`, `14:00`];
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const pins = [];

  const LivingTypes = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalo: `Бунгало`,
    undefined: `Неожиданный тип жилья`
  };

  const LivingCost = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getLivingType = (pin) => {
    return LivingTypes[pin.offer.type];
  };

  const getLivingTypeCost = (livingType) => {
    return LivingCost[livingType.value];
  };

  const getCapacity = (pin) => {
    let roomMessage = ``;
    const guestsMessage = pin.offer.guests + (pin.offer.guests === 1 ? ` гостя` : ` гостей`);

    if (pin.offer.rooms === 1) {
      roomMessage = ` комната для `;
    } else if ((pin.offer.rooms > 1) && (pin.offer.rooms < 5)) {
      roomMessage = ` комнаты для `;
    } else {
      roomMessage = ` комнат для `;
    }

    return pin.offer.rooms + roomMessage + guestsMessage;
  };

  const createPhoto = (src, photoTemplate) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.src = src;
    return photoElement;
  };

  const renderSuccessMessage = () => {
    return successTemplate.cloneNode(true);
  };

  const renderErrorMessage = () => {
    return errorTemplate.cloneNode(true);
  };

  window.data = {
    FEATURES,
    PHOTOS,
    TYPES,
    CHECKINTIMES,
    CHECKOUTTIMES,
    pins,
    getRandomInt,
    getLivingType,
    getLivingTypeCost,
    getCapacity,
    createPhoto,
    renderSuccessMessage,
    renderErrorMessage,
  };
})();
