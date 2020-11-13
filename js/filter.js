'use strict';

(() => {
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

  const housungFeatures = document.querySelectorAll(`.map__checkbox`);
  const mapFilters = document.querySelectorAll(`.map__filter`);

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
    }
    return option.filter((pin) => {
      return String(pin.offer.type) === typeOfHousing.value;
    });
  };

  const getHousingRooms = (option) => {
    removeElements();
    if (housungRooms.value === ANY) {
      return option;
    }
    return option.filter((pin) => {
      return String(pin.offer.rooms) === housungRooms.value;
    });
  };

  const getHousingGuest = (option) => {
    removeElements();
    if (housungGuests.value === ANY) {
      return option;
    }
    return option.filter((pin) => {
      return String(pin.offer.guests) === housungGuests.value;
    });
  };

  const getPrice = (option) => {
    removeElements();
    let samePins = option;
    if (housungPrice.value === LOW) {
      samePins = option.filter((pin) => {
        return pin.offer.price < 10000;
      });
    } else if (housungPrice.value === MIDDLE) {
      samePins = option.filter((pin) => {
        return ((pin.offer.price > 1000) && (pin.offer.price < 50000));
      });
    } else if (housungPrice.value === HIGT) {
      samePins = option.filter((pin) => {
        return pin.offer.price > 50000;
      });
    }
    return samePins;
  };

  const getFeature = (option, elem) => {
    removeElements();
    if (elem.checked) {
      let samePins = option.filter((pin) => {
        return (pin.offer.features.includes(elem.value));
      });
      return samePins;
    }
    return option;
  };

  const filterPins = () => {
    const filteredHousing = getTypeOfHousing(window.pins);
    const filteredRooms = getHousingRooms(filteredHousing);
    const filteredGuests = getHousingGuest(filteredRooms);
    const filteredPrice = getPrice(filteredGuests);
    const filteredWifi = getFeature(filteredPrice, checkboxWifi);
    const filteredDishwashers = getFeature(filteredWifi, checkboxDishwasher);
    const filteredParking = getFeature(filteredDishwashers, checkboxParking);
    const filteredWashers = getFeature(filteredParking, checkboxWasher);
    const filteredElevators = getFeature(filteredWashers, checkboxElevator);
    const filteredConditioners = getFeature(filteredElevators, checkboxConditioner);
    window.main.addPinsToMap(filteredConditioners);
  };

  for (let mapFilter of mapFilters) {
    mapFilter.addEventListener(`change`, window.debounce(filterPins));
  }

  for (let housungFeature of housungFeatures) {
    housungFeature.addEventListener(`change`, window.debounce(filterPins));
  }

  window.filter = {
    removeElements
  };

})();
