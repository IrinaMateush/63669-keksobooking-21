'use strict';

(() => {
  const HOUSING_MIN_COST = 1000;
  const main = document.querySelector(`main`);
  const noticeBlank = document.querySelector(`form.ad-form`);
  const noticeAvatar = noticeBlank.querySelector(`#avatar`);
  const noticeRooms = noticeBlank.querySelector(`#room_number`);
  const noticeTitle = noticeBlank.querySelector(`#title`);
  const noticeCapacity = noticeBlank.querySelector(`#capacity`);
  const noticeAddress = noticeBlank.querySelector(`#address`);
  const noticeTimeIn = noticeBlank.querySelector(`#timein`);
  const noticeTimeOut = noticeBlank.querySelector(`#timeout`);
  const noticeHousing = noticeBlank.querySelector(`#type`);
  const noticePrice = noticeBlank.querySelector(`#price`);
  const noticeReset = noticeBlank.querySelector(`.ad-form__reset`);
  const noticeInputs = document.querySelectorAll(`.ad-form__element input`);
  const noticeSelects = document.querySelectorAll(`.ad-form__element select`);
  const noticeDescription = document.querySelector(`#description`);

  noticePrice.setAttribute(`placeholder`, HOUSING_MIN_COST);
  noticePrice.setAttribute(`min`, HOUSING_MIN_COST);

  const disabledFields = (elements) => {
    for (const element of elements) {
      element.setAttribute(`disabled`, `disabled`);
    }
  };

  const activateFields = (elements) => {
    for (const element of elements) {
      element.removeAttribute(`disabled`, `disabled`);
    }
  };

  const changeCursorDefaut = (elements) => {
    for (const element of elements) {
      element.style.cursor = `default`;
    }
  };

  const changeCursorPointer = (elements) => {
    for (const element of elements) {
      element.style.cursor = `pointer`;
    }
  };

  const disabledAll = () => {
    disabledFields(window.map.mapSelectFilters);
    disabledFields(window.map.mapCheckboxFilters);
    changeCursorDefaut(window.map.mapSelectFilters);
    changeCursorDefaut(window.map.mapLabelFilters);
    disabledFields(noticeInputs);
    disabledFields(noticeSelects);
    noticeDescription.setAttribute(`disabled`, `disabled`);
    noticeAvatar.setAttribute(`disabled`, `disabled`);
    noticeBlank.classList.add(`ad-form--disabled`);
    window.main.mainPin.style.top = window.move.mainPinPositionY + `px`;
    window.main.mainPin.style.left = window.move.mainPinPositionX + `px`;
  };

  disabledAll();
  noticeAddress.setAttribute(`placeholder`, window.move.mainPinCenterX + `, ` + window.move.mainPinCenterY);

  const checkAvailabilityHandler = () => {
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
    const times = timeIn.querySelectorAll(`option`);
    for (const time of times) {
      if (time.value === timeOut.value) {
        time.selected = true;
      }
    }
  };

  const showSuccess = () => {
    const successFragment = document.createDocumentFragment();
    successFragment.appendChild(window.data.renderSuccessMessage());
    main.insertBefore(successFragment, window.main.map);

    const successMessage = document.querySelector(`.success`);

    const successEscPressHandler = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        successMessage.remove();
      }
    };

    document.addEventListener(`click`, () => {
      successMessage.remove();
    });

    document.addEventListener(`keydown`, successEscPressHandler);
  };

  const showError = () => {
    const errorFragment = document.createDocumentFragment();
    errorFragment.appendChild(window.data.renderErrorMessage());
    main.insertBefore(errorFragment, window.main.map);

    const errorMessage = document.querySelector(`.error`);

    errorMessage.addEventListener(`click`, () => {
      errorMessage.remove();
    });

    const errorEscPressHandler = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        errorMessage.remove();
      }
    };

    document.addEventListener(`keydown`, errorEscPressHandler);
  };

  const checkFields = () => {
    let isValid = true;
    if ((noticeRooms.value === `1`) && (noticeCapacity.value !== `1`)) {
      noticeRooms.setCustomValidity(`1 комната только для 1 гостя`);
      noticeRooms.reportValidity();
      isValid = false;
    } else if (noticeTitle.validity.valueMissing) {
      noticeTitle.setCustomValidity(`Обязательное поле`);
      noticeTitle.reportValidity();
      isValid = false;
    } else if (noticePrice.validity.valueMissing) {
      noticePrice.setCustomValidity(`Обязательное поле`);
      noticePrice.reportValidity();
      isValid = false;
    } else if (noticeTitle.validity.tooLong) {
      noticeTitle.setCustomValidity(`Максимальная длина - 100 символов`);
      noticeTitle.reportValidity();
      isValid = false;
    } else if (noticeTitle.validity.tooShort) {
      noticeTitle.setCustomValidity(`Минимальная длина - 30 символов`);
      noticeTitle.reportValidity();
      isValid = false;
    } else if (noticePrice.validity.rangeOverflow) {
      noticePrice.setCustomValidity(`Максимальное значение 1000000`);
      noticePrice.reportValidity();
      isValid = false;
    } else {
      noticeRooms.setCustomValidity(``);
      noticeTitle.setCustomValidity(``);
      noticePrice.setCustomValidity(``);
    }
    return isValid;
  };

  noticeReset.addEventListener(`click`, () => {
    noticeBlank.reset();
    window.filter.removeElements();
    disabledAll();
    window.form.noticeAddress.setAttribute(`value`, window.move.mainPinCenterX + `, ` + window.move.mainPinTailY);
    window.main.mainPin.addEventListener(`click`, window.move.getPinsHandler);
  });

  const successUploadHandler = () => {
    noticeBlank.reset();
    disabledAll();
    showSuccess();
    window.filter.removeElements();
    window.form.noticeAddress.setAttribute(`value`, window.move.mainPinCenterX + `, ` + window.move.mainPinTailY);
  };

  const errorLoadHandler = () => {
    showError();
  };

  noticeBlank.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    if (!checkFields()) {
      return;
    }
    window.backend.workWithServer(`POST`, window.backend.UPLOAD_URL, successUploadHandler);
    window.main.mainPin.addEventListener(`click`, window.move.getPinsHandler);
  });

  noticeCapacity.addEventListener(`change`, checkAvailabilityHandler);

  noticeRooms.addEventListener(`change`, checkAvailabilityHandler);

  noticeTimeIn.addEventListener(`change`, () => {
    synchronizeTime(noticeTimeOut, noticeTimeIn);
  });

  noticeTimeOut.addEventListener(`change`, () => {
    synchronizeTime(noticeTimeIn, noticeTimeOut);
  });

  noticeHousing.addEventListener(`change`, () => {
    const cost = window.data.getLivingTypeCost(noticeHousing);
    noticePrice.setAttribute(`placeholder`, cost);
    noticePrice.setAttribute(`min`, cost);
  });

  window.form = {
    noticeBlank,
    noticeInputs,
    noticeSelects,
    noticeDescription,
    noticeAvatar,
    noticeAddress,
    activateFields,
    changeCursorPointer,
    errorLoadHandler,
    showError
  };

})();
