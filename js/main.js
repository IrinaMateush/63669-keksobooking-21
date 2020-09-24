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

const MIN_X = pinListElement.getBoundingClientRect().x;
const MAX_X = pinListElement.getBoundingClientRect().width;

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getArrayRandomLength(arr) {
  let newArrayLength = getRandomInt(1, arr.length);
  let newArr = [];
  for (let i = 0; i < newArrayLength; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}

let getArrayPins = function (pinsCount) {
  let pins = [];

  for (let i = 0; i < pinsCount; i++) {
    let x = getRandomInt(MIN_X, MAX_X);
    let y = getRandomInt(MIN_Y, MAX_Y);
    let photoIndex = i + 1;

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
        'features': getArrayRandomLength(FEATURES),
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

let pins = getArrayPins(PINS_COUNT);

function renderPin(pin) {
  let pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = (pin.location.x - PIN_HALF_WIDTH) + `px`;
  pinElement.style.top = (pin.location.y - PIN_HEIGHT) + `px`;
  pinElement.querySelector(`img`).setAttribute(`alt`, pin.offer.title);
  pinElement.querySelector(`img`).setAttribute(`src`, pin.author.avatar);

  return pinElement;
}

let fragment = document.createDocumentFragment();
for (let i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
pinListElement.appendChild(fragment);
