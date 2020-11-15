'use strict';

(() => {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;

  const load = (method, url, onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      }
    });

    xhr.addEventListener(`error`, () => {
      window.form.errorLoadHandler();
    });

    xhr.open(method, url);
    return (url === UPLOAD_URL) ? xhr.send(new FormData(window.form.noticeForm)) : xhr.send();
  };

  window.backend = {
    load,
    LOAD_URL,
    UPLOAD_URL
  };
})();
