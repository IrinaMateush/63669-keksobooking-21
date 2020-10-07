'use strict';

const MIN_Y = 130;
const MAX_Y = 630;
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MIN_PRICE = 1;
const MAX_PRICE = 10000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 10;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const TYPES = [`palace`, `flat`, `house`, `bungalo`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const PINS_COUNT = 8;
const PIN_HALF_WIDTH = 23;
const PIN_HEIGHT = 64;
const MAIN_PIN_TAILS_HEIGHT = 22;
const LEFT_MOUSE_BUTTON = 1;

const pinListElement = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mainPin = document.querySelector(`.map__pin--main`);

const mainPinHalf = mainPin.getBoundingClientRect().width / 2;
const mainPinCenterX = Math.round(mainPin.getBoundingClientRect().x + mainPinHalf);
const mainPinCenterY = Math.round(mainPin.getBoundingClientRect().y + mainPinHalf);
const mainPinTailY = Math.round(mainPinCenterY + mainPinHalf + MAIN_PIN_TAILS_HEIGHT);

const MIN_X = pinListElement.getBoundingClientRect().x;
const MAX_X = pinListElement.getBoundingClientRect().width;

const map = document.querySelector(`.map`);
const mapFilters = map.querySelector(`.map__filters-container`);
const noticeForm = document.querySelector(`form.ad-form`);

const mapSelectFilters = mapFilters.querySelectorAll(`.map__filter`);
const addFormElements = document.querySelectorAll(`.ad-form__element`);

const noticeAvatar = noticeForm.querySelector(`#avatar`);
const noticeRooms = noticeForm.querySelector(`#room_number`);
const noticeCapacity = noticeForm.querySelector(`#capacity`);
const noticeAddress = noticeForm.querySelector(`#address`);
const noticeTimeIn = noticeForm.querySelector(`#timein`);
const noticeTimeOut = noticeForm.querySelector(`#timeout`);
const noticeHousing = noticeForm.querySelector(`#type`);
const noticePrice = noticeForm.querySelector(`#price`);
const noticeSubmit = noticeForm.querySelector(`.ad-form__submit`);

mapFilters.classList.add(`ad-form--disabled`);
noticeForm.classList.add(`ad-form--disabled`);
noticeAvatar.setAttribute(`disabled`, `disabled`);
noticeAddress.setAttribute(`placeholder`, mainPinCenterX + `, ` + mainPinCenterY);

const disabledForm = function (elements) {
  for (let element of elements) {
    element.setAttribute(`disabled`, `disabled`);
  }
};

const activateForm = function (elements) {
  for (let element of elements) {
    element.removeAttribute(`disabled`, `disabled`);
  }
};

disabledForm(mapSelectFilters);
disabledForm(addFormElements);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getArrayRandomLength = (arr) => {
  const newArrayLength = getRandomInt(1, arr.length);
  const newArr = [];
  for (let i = 0; i < newArrayLength; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};

const getFeatures = (features) => {
  return getArrayRandomLength(features).map(function (it) {
    return it;
  }).join(`, `);
};

const checkAvailability = () => {
  if ((noticeRooms.value === `1`) && (noticeCapacity.value !== `1`)) {
    noticeRooms.setCustomValidity(`1 комната только для 1 гостя`);
  } else if ((noticeRooms.value === `100`) && (noticeCapacity.value !== `0`)) {
    noticeRooms.setCustomValidity(`Is not correct`);
  } else if ((noticeRooms.value === `2`) && ((noticeCapacity.value === `3`) || (noticeCapacity.value === `0`))) {
    noticeRooms.setCustomValidity(`Для 2 и менее гостей`);
  } else if ((noticeRooms.value === `3`) && (noticeCapacity.value === `0`)) {
    noticeRooms.setCustomValidity(`Для 3 или менее гостей`);
  } else {
    noticeRooms.setCustomValidity(``);
  }
  noticeRooms.reportValidity();
};

const synchronizeTime = (timeIn, timeOut) => {
  let times = timeIn.querySelectorAll(`option`);
  for (let time of times) {
    if (time.value === timeOut.value) {
      time.selected = true;
    }
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

const getLivingTypeCost = function (livingType) {
  switch (livingType.value) {
    case `palace`:
      return 10000;
    case `flat`:
      return 1000;
    case `house`:
      return 5000;
    case `bungalow`:
      return 0;
    default:
      return `Неожиданный тип жилья`;
  }
};

const getLivingType = (pin) => {
  switch (pin.offer.type) {
    case `palace`:
      return `Дворец`;
    case `flat`:
      return `Квартира`;
    case `house`:
      return `Дом`;
    case `bungalo`:
      return `Бунгало`;
    default:
      return `Неожиданный тип жилья`;
  }
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

const getPhotos = (pin, cardElement) => {
  const randomPhotos = pin.offer.photos;
  const photosElement = cardElement.querySelector(`.popup__photos`);
  const photoElement = photosElement.querySelector(`.popup__photo`);

  const photosFragment = document.createDocumentFragment();

  for (let i = 0; i < randomPhotos.length; i++) {
    if (i === 0) {
      photoElement.src = randomPhotos[i];
    } else {
      photosFragment.appendChild(createPhoto(randomPhotos[i], photoElement));
    }
  }

  if (photosFragment.children.length) {
    photosElement.appendChild(photosFragment);
  }
};

const createPhoto = (src, photoTemplate) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.src = src;
  return photoElement;
};

const setTextContent = (block, element) => {
  const text = (element === undefined) ? block.classList.add(`hidden`) : block.textContent = element;
  return text;
};

const setTextTime = (block, dateStart, dateEnd) => {
  if ((dateStart === undefined) || (dateEnd === undefined)) {
    return block.classList.add(`hidden`);
  } else {
    const text = block.textContent = `Заезд после ` + dateStart + `, выезд до ` + dateEnd;
    return text;
  }
};

const setAvatar = (block, element) => {
  return (element === undefined) ? block.classList.add(`hidden`) : block.setAttribute(`src`, element);
};

const getArrayPins = (pinsCount) => {
  const pins = [];

  for (let i = 0; i < pinsCount; i++) {
    const x = getRandomInt(MIN_X, MAX_X);
    const y = getRandomInt(MIN_Y, MAX_Y);
    const photoIndex = i + 1;

    pins.push({
      'author': {
        'avatar': `img/avatars/user0` + photoIndex + `.png`,
      },
      'offer': {
        'title': `Шикарное предложение!`,
        'address': x + `, ` + y,
        'price': getRandomInt(MIN_PRICE, MAX_PRICE),
        'type': TYPES[getRandomInt(0, TYPES.length - 1)],
        'rooms': getRandomInt(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomInt(MIN_GUESTS, MAX_GUESTS),
        'checkin': CHECKIN[getRandomInt(0, CHECKIN.length - 1)],
        'checkout': CHECKOUT[getRandomInt(0, CHECKOUT.length - 1)],
        'features': getFeatures(FEATURES),
        'description': `Номер с видом на море`,
        'photos': getArrayRandomLength(PHOTOS),
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

const renderPin = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = (pin.location.x - PIN_HALF_WIDTH) + `px`;
  pinElement.style.top = (pin.location.y - PIN_HEIGHT) + `px`;
  pinElement.setAttribute(`tabindex`, 0);
  pinElement.querySelector(`img`).setAttribute(`alt`, pin.offer.title);
  pinElement.querySelector(`img`).setAttribute(`src`, pin.author.avatar);
  return pinElement;
};

const renderCard = (pin) => {
  const cardElement = cardTemplate.cloneNode(true);

  getPhotos(pin, cardElement);
  setTextContent(cardElement.querySelector(`.popup__title`), pin.offer.title);
  setTextContent(cardElement.querySelector(`.popup__text--address`), pin.offer.address);
  setTextContent(cardElement.querySelector(`.popup__text--price`), pin.offer.price + ` ₽/ночь`);
  setTextContent(cardElement.querySelector(`.popup__type`), getLivingType(pin));
  setTextContent(cardElement.querySelector(`.popup__text--capacity`), getCapacity(pin));
  setTextContent(cardElement.querySelector(`.popup__features`), pin.offer.features);
  setTextContent(cardElement.querySelector(`.popup__description`), pin.offer.description);
  setTextTime(cardElement.querySelector(`.popup__text--time`), pin.offer.checkin, pin.offer.checkout);
  setAvatar(cardElement.querySelector(`.popup__avatar`), pin.author.avatar);

  return cardElement;
};

const openCard = (pinsAvatar) => {
  const cardPopup = document.querySelector(`.popup`);
  if (cardPopup !== null) {
    cardPopup.remove();
  }

  const cardsFragment = document.createDocumentFragment();
  for (let pin of pins) {
    if (pin.author.avatar === pinsAvatar) {
      cardsFragment.appendChild(renderCard(pin));
    }
  }
  map.insertBefore(cardsFragment, mapFilters);
};

const closePopup = () => {
  const cardPopup = document.querySelector(`.popup`);
  const popupClose = document.querySelector(`.popup__close`);
  popupClose.addEventListener(`click`, function () {
    cardPopup.remove();
  });

  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      cardPopup.remove();
    }
  });
};

const activationСard = () => {
  map.classList.remove(`map--faded`);
  mapFilters.classList.remove(`ad-form--disabled`);
  noticeForm.classList.remove(`ad-form--disabled`);
  noticeAvatar.removeAttribute(`disabled`, `disabled`);
  activateForm(mapSelectFilters);
  activateForm(addFormElements);
  noticeAddress.setAttribute(`value`, mainPinCenterX + `, ` + mainPinTailY);

  const pinsFragment = document.createDocumentFragment();
  for (let pin of pins) {
    pinsFragment.appendChild(renderPin(pin));
  }
  pinListElement.appendChild(pinsFragment);

  const pinElements = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  for (let pinElement of pinElements) {
    pinElement.addEventListener(`click`, function () {
      const pinsAvatar = pinElement.querySelector(`img`).getAttribute(`src`);
      openCard(pinsAvatar);
      closePopup();
    });
  }
};

noticeSubmit.addEventListener(`click`, function (evt) {
  if ((noticeRooms.value === `1`) && (noticeCapacity.value !== `1`)) {
    noticeRooms.setCustomValidity(`1 комната только для 1 гостя`);
    evt.preventDefault();
  } else {
    noticeRooms.setCustomValidity(``);
  }
  noticeRooms.reportValidity();
});

noticeCapacity.addEventListener(`change`, function () {
  checkAvailability();
});

noticeRooms.addEventListener(`change`, function () {
  checkAvailability();
});

noticeTimeIn.addEventListener(`change`, function () {
  synchronizeTime(noticeTimeOut, noticeTimeIn);
});

noticeTimeOut.addEventListener(`change`, function () {
  synchronizeTime(noticeTimeIn, noticeTimeOut);
});

noticeHousing.addEventListener(`change`, function () {
  const cost = getLivingTypeCost(noticeHousing);
  noticePrice.setAttribute(`placeholder`, cost);
  noticePrice.setAttribute(`min`, cost);
});
