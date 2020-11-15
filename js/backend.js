'use strict';

(() => {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;

  const workWithServer = (method, url, successHandler) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        successHandler(xhr.response);
      }
    });

    xhr.addEventListener(`error`, () => {
      window.form.errorLoadHandler();
    });

    xhr.open(method, url);
    return (url === UPLOAD_URL) ? xhr.send(new FormData(window.form.noticeForm)) : xhr.send();
  };

  window.backend = {
    workWithServer,
    LOAD_URL,
    UPLOAD_URL
  };
})();
