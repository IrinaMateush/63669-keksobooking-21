'use strict';

(() => {
  const ANY = `any`;
  const LOW = `low`;
  const MIDDLE = `middle`;
  const HIGT = `higt`;
  const typeOfHousing = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);

  const checkboxWifi = document.querySelector(`#filter-wifi`);
  const checkboxDishwasher = document.querySelector(`#filter-dishwasher`);
  const checkboxParking = document.querySelector(`#filter-parking`);
  const checkboxWasher = document.querySelector(`#filter-washer`);
  const checkboxElevator = document.querySelector(`#filter-elevator`);
  const checkboxConditioner = document.querySelector(`#filter-conditioner`);

  const housingFeatures = document.querySelectorAll(`.map__checkbox`);
  const mapFilters = document.querySelectorAll(`.map__filter`);

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
    if (housingRooms.value === ANY) {
      return option;
    }
    return option.filter((pin) => {
      return String(pin.offer.rooms) === housingRooms.value;
    });
  };

  const getHousingGuest = (option) => {
    removeElements();
    if (housingGuests.value === ANY) {
      return option;
    }
    return option.filter((pin) => {
      return String(pin.offer.guests) === housingGuests.value;
    });
  };

  const getPrice = (option) => {
    removeElements();
    let samePins = option;
    if (housingPrice.value === LOW) {
      samePins = option.filter((pin) => {
        return pin.offer.price < 10000;
      });
    } else if (housingPrice.value === MIDDLE) {
      samePins = option.filter((pin) => {
        return ((pin.offer.price > 1000) && (pin.offer.price < 50000));
      });
    } else if (housingPrice.value === HIGT) {
      samePins = option.filter((pin) => {
        return pin.offer.price > 50000;
      });
    }
    return samePins;
  };

  const getFeature = (option, elem) => {
    removeElements();
    if (elem.checked) {
      return option.filter((pin) => {
        return (pin.offer.features.includes(elem.value));
      });
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

  for (let housingFeature of housingFeatures) {
    housingFeature.addEventListener(`change`, window.debounce(filterPins));
  }

  window.filter = {
    removeElements
  };

})();
