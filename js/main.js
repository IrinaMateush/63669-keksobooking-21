'use strict';

(function () {
  const mainPin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  const pinListElement = document.querySelector(`.map__pins`);
  const typeOfHousing = document.querySelector(`#housing-type`);
  const housungPrice = document.querySelector(`#housing-price`);
  const housungRooms = document.querySelector(`#housing-rooms`);
  const housungGuests = document.querySelector(`#housing-guests`);
  const housungFeatures = document.querySelectorAll(`.map__checkbox`);
  const mapFilters = document.querySelectorAll(`.map__filter`);

  const PINS_COUNT = 5;
  const ANY = `any`;
  const LOW = `low`;
  const MIDDLE = `middle`;
  const HIGT = `higt`;

  const addPinsToMap = (pins, count) => {
    const pinsFragment = document.createDocumentFragment();
    if (count > PINS_COUNT) {
      count = PINS_COUNT;
    }
    for (let i = 0; i < count; i++) {
      pinsFragment.appendChild(window.map.renderPin(pins[i]));
    }

    pinListElement.appendChild(pinsFragment);

    const pinElements = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    window.pinElements = pinElements;

    for (let pinElement of pinElements) {
      pinElement.addEventListener(`click`, function () {
        const pinsAvatar = pinElement.querySelector(`img`).getAttribute(`src`);
        window.map.openCard(pinsAvatar);
        window.map.closePopup();
      });
    }
  };

  const activationСard = () => {
    map.classList.remove(`map--faded`);
    window.map.mapFilters.classList.remove(`ad-form--disabled`);
    window.form.noticeForm.classList.remove(`ad-form--disabled`);
    window.form.noticeAvatar.removeAttribute(`disabled`, `disabled`);
    window.form.addFormDescription.removeAttribute(`disabled`, `disabled`);
    window.form.activateForm(window.map.mapSelectFilters);
    window.form.activateForm(window.map.mapСheckboxFilters);
    window.form.activateForm(window.form.addFormInputs);
    window.form.activateForm(window.form.addFormSelects);
    window.form.noticeAddress.setAttribute(`value`, window.move.mainPinCenterX + `, ` + window.move.mainPinTailY);
  };

  const changeFilters = () => {
    const cardPopup = document.querySelector(`.popup`);
    if (cardPopup !== null) {
      cardPopup.remove();
    }

    if (window.pinElements !== null) {
      for (let pinElement of window.pinElements) {
        pinElement.remove();
      }
    }
  };

  const getTypeOfHousing = (option) => {
    changeFilters();
    let samePins = window.pins.filter(function (pin) {
      return String(pin.offer.type) === option.value;
    });
    filterPins(samePins);
  };

  const getHousingRooms = (option) => {
    changeFilters();
    let samePins = window.pins.filter(function (pin) {
      return String(pin.offer.rooms) === option.value;
    });
    filterPins(samePins);
  };

  const getHousingGuest = (option) => {
    changeFilters();
    let samePins = window.pins.filter(function (pin) {
      return String(pin.offer.guests) === option.value;
    });
    filterPins(samePins);
  };

  const getPrice = (option) => {
    if (option.value === LOW) {
      let samePins = window.pins.filter(function (pin) {
        return pin.offer.price < 10000;
      });
      filterPins(samePins);
    } else if (option.value === MIDDLE) {
      let samePins = window.pins.filter(function (pin) {
        return ((pin.offer.price > 1000) && (pin.offer.price < 50000));
      });
      filterPins(samePins);
    } else if (option.value === HIGT) {
      let samePins = window.pins.filter(function (pin) {
        return pin.offer.price > 50000;
      });
      filterPins(samePins);
    }
  };

  for (let mapFilter of mapFilters) {
    mapFilter.addEventListener(`change`, function () {
      if (mapFilter.value !== ANY) {
        changeFilters();
        if (mapFilter === typeOfHousing) {
          getTypeOfHousing(mapFilter);
        } else if (mapFilter === housungPrice) {
          getPrice(mapFilter);
        } else if (mapFilter === housungRooms) {
          getHousingRooms(mapFilter);
        } else if (mapFilter === housungGuests) {
          getHousingGuest(mapFilter);
        }
      } else {
        successLoadHandler(window.pins);
      }
    });
  }

  for (let housungFeature of housungFeatures) {
    housungFeature.addEventListener(`change`, function () {
      changeFilters();
      if (housungFeature.checked) {
        let samePins = window.pins.filter(function (pin) {
          const features = pin.offer.features;
          return (features.includes(housungFeature.value));
        });
        filterPins(samePins);
      } else {
        successLoadHandler(window.pins);
      }
    });
  }

  const filterPins = (pins) => {
    addPinsToMap(pins, pins.length);
  };

  const successLoadHandler = (pins) => {
    window.pins = pins;
    addPinsToMap(pins, PINS_COUNT);
    activationСard();
  };

  const errorLoadHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `fixed`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `25px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      activationСard(window.backend.load(window.main.successLoadHandler, window.main.errorLoadHandler));
    }
  });

  window.main = {
    mainPin,
    map,
    activationСard,
    successLoadHandler,
    errorLoadHandler
  };

})();
