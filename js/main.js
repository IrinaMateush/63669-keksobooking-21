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

const pinListElement = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const MIN_X = pinListElement.getBoundingClientRect().x;
const MAX_X = pinListElement.getBoundingClientRect().width;

const map = document.querySelector(`.map`);
const mapFilters = map.querySelector(`.map__filters-container`);
map.classList.remove(`map--faded`);

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

const setTextTime = (block, el1, el2) => {
  const text = ((el1 === undefined) || (el2 === undefined)) ? block.classList.add(`hidden`) : block.textContent = `Заезд после ` + el1 + `, выезд до ` + el2;
  return text;
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

const pinsFragment = document.createDocumentFragment();
for (let i = 0; i < pins.length; i++) {
  pinsFragment.appendChild(renderPin(pins[i]));
}
pinListElement.appendChild(pinsFragment);

const cardsFragment = document.createDocumentFragment();
for (let i = 0; i < pins.length; i++) {
  cardsFragment.appendChild(renderCard(pins[i]));
}
map.insertBefore(cardsFragment, mapFilters);
