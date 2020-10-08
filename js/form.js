'use strict';

(function () {
  const noticeForm = document.querySelector(`form.ad-form`);
  const noticeAvatar = noticeForm.querySelector(`#avatar`);
  const noticeRooms = noticeForm.querySelector(`#room_number`);
  const noticeCapacity = noticeForm.querySelector(`#capacity`);
  const noticeAddress = noticeForm.querySelector(`#address`);
  const noticeTimeIn = noticeForm.querySelector(`#timein`);
  const noticeTimeOut = noticeForm.querySelector(`#timeout`);
  const noticeHousing = noticeForm.querySelector(`#type`);
  const noticePrice = noticeForm.querySelector(`#price`);
  const noticeSubmit = noticeForm.querySelector(`.ad-form__submit`);
  const addFormElements = document.querySelectorAll(`.ad-form__element`);

  noticeForm.classList.add(`ad-form--disabled`);
  noticeAvatar.setAttribute(`disabled`, `disabled`);
  noticeAddress.setAttribute(`placeholder`, window.map.mainPinCenterX + `, ` + window.map.mainPinCenterY);

  const disabledForm = function (elements) {
    for (let element of elements) {
      element.setAttribute(`disabled`, `disabled`);
    }
  };

  disabledForm(window.map.mapSelectFilters);
  disabledForm(addFormElements);

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

  const activateForm = (elements) => {
    for (let element of elements) {
      element.removeAttribute(`disabled`, `disabled`);
    }
  };

  noticeSubmit.addEventListener(`click`, function (evt) {
    if ((noticeRooms.value === `1`) && (noticeCapacity.value !== `1`)) {
      noticeRooms.setCustomValidity(`1 комната только для 1 гостя`);
      evt.preventDefault();
    } else {
      noticeRooms.setCustomValidity(``);
    }
    noticeRooms.reportValidity();
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
    noticeAvatar,
    noticeAddress,
    addFormElements,
    activateForm: activateForm
  };

})();
