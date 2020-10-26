'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const renderSuccessMessage = () => {
    const successElement = successTemplate.cloneNode(true);
    return successElement;
  };

  const renderErrorMessage = () => {
    const errorElement = errorTemplate.cloneNode(true);
    return errorElement;
  };

  const upload = (data, onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    let error;
    xhr.responseType = `json`;

    xhr.addEventListener(`upload`, function () {
      onSuccess(xhr.response);
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.upload = {
    upload,
    renderSuccessMessage,
    renderErrorMessage
  };

})();
