'use strict';

(function () {
  const typeOfHousing = document.querySelector(`#housing-type`);
  const housungPrice = document.querySelector(`#housing-price`);
  const housungRooms = document.querySelector(`#housing-rooms`);
  const housungGuests = document.querySelector(`#housing-guests`);
  const housungFeatures = document.querySelectorAll(`.map__checkbox`);
  const mapFilters = document.querySelectorAll(`.map__filter`);

  const ANY = `any`;
  const LOW = `low`;
  const MIDDLE = `middle`;
  const HIGT = `higt`;

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
    return samePins;
  };

  const getHousingRooms = (option) => {
    changeFilters();
    let samePins = window.pins.filter(function (pin) {
      return String(pin.offer.rooms) === option.value;
    });
    return samePins;
  };

  const getHousingGuest = (option) => {
    changeFilters();
    let samePins = window.pins.filter(function (pin) {
      return String(pin.offer.guests) === option.value;
    });
    return samePins;
  };

  const getPrice = (option) => {
    let samePins;
    if (option.value === LOW) {
      samePins = window.pins.filter(function (pin) {
        return pin.offer.price < 10000;
      });
    } else if (option.value === MIDDLE) {
      samePins = window.pins.filter(function (pin) {
        return ((pin.offer.price > 1000) && (pin.offer.price < 50000));
      });
    } else if (option.value === HIGT) {
      samePins = window.pins.filter(function (pin) {
        return pin.offer.price > 50000;
      });
    }
    return samePins;
  };

  for (let mapFilter of mapFilters) {
    mapFilter.addEventListener(`change`, function () {
      let samePins;
      if (mapFilter.value !== ANY) {
        changeFilters();
        if (mapFilter === typeOfHousing) {
          samePins = getTypeOfHousing(mapFilter);
          filterPins(samePins);
        } else if (mapFilter === housungPrice) {
          samePins = getPrice(mapFilter);
          filterPins(samePins);
        } else if (mapFilter === housungRooms) {
          samePins = getHousingRooms(mapFilter);
          filterPins(samePins);
        } else if (mapFilter === housungGuests) {
          samePins = getHousingGuest(mapFilter);
          filterPins(samePins);
        }
      } else {
        window.main.successLoadHandler(window.pins);
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
        window.main.successLoadHandler(window.pins);
      }
    });
  }

  const filterPins = (pins) => {
    window.main.addPinsToMap(pins);
  };

})();
