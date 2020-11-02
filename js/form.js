'use strict';

(function () {
  const main = document.querySelector(`main`);
  const noticeForm = document.querySelector(`form.ad-form`);
  const noticeAvatar = noticeForm.querySelector(`#avatar`);
  const noticeRooms = noticeForm.querySelector(`#room_number`);
  const noticeTitle = noticeForm.querySelector(`#title`);
  const noticeCapacity = noticeForm.querySelector(`#capacity`);
  const noticeAddress = noticeForm.querySelector(`#address`);
  const noticeTimeIn = noticeForm.querySelector(`#timein`);
  const noticeTimeOut = noticeForm.querySelector(`#timeout`);
  const noticeHousing = noticeForm.querySelector(`#type`);
  const noticePrice = noticeForm.querySelector(`#price`);
  const noticeSubmit = noticeForm.querySelector(`.ad-form__submit`);
  const noticeReset = noticeForm.querySelector(`.ad-form__reset`);
  const addFormInputs = document.querySelectorAll(`.ad-form__element input`);
  const addFormSelects = document.querySelectorAll(`.ad-form__element select`);
  const addFormDescription = document.querySelector(`#description`);
  const HOUSING_MIN_COST = 5000;

  noticePrice.setAttribute(`min`, HOUSING_MIN_COST);

  const disabledFields = (elements) => {
    for (let element of elements) {
      element.setAttribute(`disabled`, `disabled`);
    }
  };

  const activateForm = (elements) => {
    for (let element of elements) {
      element.removeAttribute(`disabled`, `disabled`);
    }
  };

  const disabledAll = () => {
    disabledFields(window.map.mapSelectFilters);
    disabledFields(window.map.mapСheckboxFilters);
    disabledFields(addFormInputs);
    disabledFields(addFormSelects);
    addFormDescription.setAttribute(`disabled`, `disabled`);
    noticeAvatar.setAttribute(`disabled`, `disabled`);
    noticeForm.classList.add(`ad-form--disabled`);
    noticeAddress.setAttribute(`placeholder`, window.move.mainPinCenterX + `, ` + window.move.mainPinCenterY);
  };

  disabledAll();

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

  const showSuccess = () => {
    const successFragment = document.createDocumentFragment();
    successFragment.appendChild(window.data.renderSuccessMessage());
    main.insertBefore(successFragment, window.main.map);

    const successMessage = document.querySelector(`.success`);

    document.addEventListener(`click`, function () {
      successMessage.remove();
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        successMessage.remove();
      }
    });
  };

  const showError = () => {
    const errorFragment = document.createDocumentFragment();
    errorFragment.appendChild(window.data.renderErrorMessage());
    main.insertBefore(errorFragment, window.main.map);

    const errorMessage = document.querySelector(`.error`);

    document.addEventListener(`click`, function () {
      errorMessage.remove();
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        errorMessage.remove();
      }
    });
  };

  const checkFields = () => {
    if ((noticeRooms.value === `1`) && (noticeCapacity.value !== `1`)) {
      noticeRooms.setCustomValidity(`1 комната только для 1 гостя`);
      noticeRooms.reportValidity();
      return;
    } else if (noticeTitle.validity.valueMissing) {
      noticeTitle.setCustomValidity(`Обязательное поле`);
      noticeTitle.reportValidity();
      return;
    } else if (noticePrice.validity.valueMissing) {
      noticePrice.setCustomValidity(`Обязательное поле`);
      noticePrice.reportValidity();
      return;
    } else {
      noticeRooms.setCustomValidity(``);
      noticeTitle.setCustomValidity(``);
      noticePrice.setCustomValidity(``);
    }
  };

  noticeReset.addEventListener(`click`, function () {
    noticeForm.reset();
    disabledAll();
  });

  const successUploadHandler = () => {
    noticeForm.reset();
    disabledAll();
    showSuccess();
  };

  const errorUploadHandler = () => {
    showError();
  };

  noticeSubmit.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    checkFields();
    window.backend.upload(new FormData(noticeForm), successUploadHandler, errorUploadHandler);
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
    const cost = window.data.getLivingTypeCost(noticeHousing);
    noticePrice.setAttribute(`placeholder`, cost);
    noticePrice.setAttribute(`min`, cost);
  });

  window.form = {
    noticeForm,
    addFormInputs,
    addFormSelects,
    addFormDescription,
    noticeAvatar,
    noticeAddress,
    activateForm,
    showError
  };

})();
