'use strict';

(function () {
  const typeOfHousing = document.querySelector(`#housing-type`);
  const housungPrice = document.querySelector(`#housing-price`);
  const housungRooms = document.querySelector(`#housing-rooms`);
  const housungGuests = document.querySelector(`#housing-guests`);

  const checkboxWifi = document.querySelector(`#filter-wifi`);
  const checkboxDishwasher = document.querySelector(`#filter-dishwasher`);
  const checkboxParking = document.querySelector(`#filter-parking`);
  const checkboxWasher = document.querySelector(`#filter-washer`);
  const checkboxElevator = document.querySelector(`#filter-elevator`);
  const checkboxConditioner = document.querySelector(`#filter-conditioner`);

  const ANY = `any`;
  const LOW = `low`;
  const MIDDLE = `middle`;
  const HIGT = `higt`;

  const removeElements = () => {
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
    removeElements();
    if (typeOfHousing.value === ANY) {
      return option;
    } else {
      let samePins = option.filter(function (pin) {
        return String(pin.offer.type) === typeOfHousing.value;
      });
      return samePins;
    }
  };

  const getHousingRooms = (option) => {
    removeElements();
    if (housungRooms.value === ANY) {
      return option;
    } else {
      let samePins = option.filter(function (pin) {
        return String(pin.offer.rooms) === housungRooms.value;
      });
      return samePins;
    }
  };

  const getHousingGuest = (option) => {
    removeElements();
    if (housungGuests.value === ANY) {
      return option;
    } else {
      let samePins = option.filter(function (pin) {
        return String(pin.offer.guests) === housungGuests.value;
      });
      return samePins;
    }
  };

  const getPrice = (option) => {
    removeElements();
    let samePins = option;
    if (housungPrice.value === LOW) {
      samePins = option.filter(function (pin) {
        return pin.offer.price < 10000;
      });
    } else if (housungPrice.value === MIDDLE) {
      samePins = option.filter(function (pin) {
        return ((pin.offer.price > 1000) && (pin.offer.price < 50000));
      });
    } else if (housungPrice.value === HIGT) {
      samePins = option.filter(function (pin) {
        return pin.offer.price > 50000;
      });
    }
    return samePins;
  };

  const getFeature = (option, elem) => {
    removeElements();
    if (elem.checked) {
      let samePins = option.filter(function (pin) {
        const features = pin.offer.features;
        return (features.includes(elem.value));
      });
      return samePins;
    } else {
      return option;
    }
  };

  const filterPins = () => {
    let result = getTypeOfHousing(window.pins);
    let result2 = getHousingRooms(result);
    let result3 = getHousingGuest(result2);
    let result4 = getPrice(result3);
    let result5 = getFeature(result4, checkboxWifi);
    let result6 = getFeature(result5, checkboxDishwasher);
    let result7 = getFeature(result6, checkboxParking);
    let result8 = getFeature(result7, checkboxWasher);
    let result9 = getFeature(result8, checkboxElevator);
    let result10 = getFeature(result9, checkboxConditioner);
    window.main.addPinsToMap(result10);
  };

  typeOfHousing.addEventListener(`change`, function () {
    filterPins();
  });

  housungRooms.addEventListener(`change`, function () {
    filterPins();
  });

  housungGuests.addEventListener(`change`, function () {
    filterPins();
  });

  housungPrice.addEventListener(`change`, function () {
    filterPins();
  });

  checkboxWifi.addEventListener(`change`, function () {
    filterPins();
  });

  checkboxDishwasher.addEventListener(`change`, function () {
    filterPins();
  });

  checkboxParking.addEventListener(`change`, function () {
    filterPins();
  });

  checkboxWasher.addEventListener(`change`, function () {
    filterPins();
  });

  checkboxElevator.addEventListener(`change`, function () {
    filterPins();
  });

  checkboxConditioner.addEventListener(`change`, function () {
    filterPins();
  });

})();
