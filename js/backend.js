'use strict';

(() => {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;

  const load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;

      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Статус ответа: ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = 10000;

    xhr.open(`GET`, LOAD_URL);
    xhr.send();
  };

  const upload = (data, onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, () => {
      window.form.errorLoadHandler();
    });

    xhr.open(`POST`, UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load,
    upload
  };
})();
