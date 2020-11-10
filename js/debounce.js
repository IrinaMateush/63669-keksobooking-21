'use strict';

(() => {
  const DEBOUNCE_INTERVAL = 300;

  window.debounce = (cb) => {
    const lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
