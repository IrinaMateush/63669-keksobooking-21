'use strict';

(() => {
  const loadURL = `https://21.javascript.pages.academy/keksobooking/data`;
  const uploadURL = `https://21.javascript.pages.academy/keksobooking`;

  const load = (getSuccess, getError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;

      switch (xhr.status) {
        case 200:
          getSuccess(xhr.response);
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
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        getError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      getError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      getError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = 10000;

    xhr.open(`GET`, loadURL);
    xhr.send();
  };

  const upload = (data, getSuccess, getError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {

      if (xhr.status === 200) {
        getSuccess(xhr.response);
      } else {
        getError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.open(`POST`, uploadURL);
    xhr.send(data);
  };

  window.backend = {
    load,
    upload
  };
})();
