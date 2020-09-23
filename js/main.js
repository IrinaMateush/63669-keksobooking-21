"use strict";

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var PINSCOUNT = 8;

var pinListElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getArrayRandomLength(arr) {
  let newArr = [];
  var newArrayLength = getRandomInt(1, arr.length);
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  for (i=0; i<newArrayLength; i++) {
    newArr.push(arr[i])
  }
  return newArr;
}

var getArrayPins = function (PINSCOUNT) {
  var arr = [];
  var MIN_X = pinListElement.getBoundingClientRect().x;
  var MAX_X = pinListElement.getBoundingClientRect().width;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  var MIN_PRICE = 1;
  var MAX_PRICE = 10000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 10;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10;
  var TYPES = ["palace", "flat", "house", "bungalo"];
  var CHECKIN = ["12:00", "13:00", "14:00"];
  var CHECKOUT = ["12:00", "13:00", "14:00"];

  for (var i = 0; i < PINSCOUNT; i++) {
    var x = getRandomInt(MIN_X, MAX_X);
    var y = getRandomInt(MIN_Y, MAX_Y);
    var photoIndex = i + 1;

    arr.push({
      "author": {
        "avatar": "img/avatars/user0" + photoIndex + ".png",
      },
      "offer": {
        "title": "Шикарное предложение!",
        "address": x + ", " + y,
        "price": getRandomInt(MIN_PRICE, MAX_PRICE),
        "type": TYPES[getRandomInt(0, TYPES.length - 1)],
        "rooms": getRandomInt(MIN_ROOMS, MAX_ROOMS),
        "guests": getRandomInt(MIN_GUESTS, MAX_GUESTS),
        "checkin": CHECKIN[getRandomInt(0, CHECKIN.length - 1)],
        "checkout": CHECKOUT[getRandomInt(0, CHECKOUT.length - 1)],
        "features": getArrayRandomLength(FEATURES),
        "description": "Номер с видом на море",
        "photos": getArrayRandomLength(PHOTOS),
      },
      "location": {
        "x": x,
        "y": y,
      },
    })
  }
  return arr;
};

var pins = getArrayPins(PINSCOUNT);

function renderPin(pin) {
  var pinHalfWidth = 23;
  var pinHeight = 64;
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.setAttribute('style', "left: " + (pin.location.x - pinHalfWidth) + "px; top:" + (pin.location.y - pinHeight) + "px;");
  pinElement.querySelector('img').setAttribute('alt', pin.offer.title);
  pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
  return pinElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
pinListElement.appendChild(fragment);
