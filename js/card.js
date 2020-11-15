'use strict';

(() => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const getPhotos = (pin, cardElement) => {
    const randomPhotos = pin.offer.photos;
    const photosElement = cardElement.querySelector(`.popup__photos`);
    const photoElement = photosElement.querySelector(`.popup__photo`);
    const photosFragment = document.createDocumentFragment();

    for (let i = 0; i < randomPhotos.length; i++) {
      if (i === 0) {
        photoElement.src = randomPhotos[i];
      } else {
        photosFragment.appendChild(window.data.createPhoto(randomPhotos[i], photoElement));
      }
    }

    if (photosFragment.children.length) {
      photosElement.appendChild(photosFragment);
    } else {
      photosElement.classList.add(`hidden`);
    }
  };

  const setTextContent = (block, element) => {
    const text = (element === undefined) ? block.classList.add(`hidden`) : block.textContent = element;
    return text;
  };

  const setTextTime = (block, dateStart, dateEnd) => {
    if ((dateStart === undefined) || (dateEnd === undefined)) {
      return block.classList.add(`hidden`);
    }
    const text = block.textContent = `Заезд после ` + dateStart + `, выезд до ` + dateEnd;
    return text;
  };

  const setAvatar = (block, element) => {
    return (element === undefined) ? block.classList.add(`hidden`) : block.setAttribute(`src`, element);
  };

  const renderAdvertising = (pin) => {
    const cardElement = cardTemplate.cloneNode(true);

    getPhotos(pin, cardElement);
    setTextContent(cardElement.querySelector(`.popup__title`), pin.offer.title);
    setTextContent(cardElement.querySelector(`.popup__text--address`), pin.offer.address);
    setTextContent(cardElement.querySelector(`.popup__text--price`), pin.offer.price + ` ₽/ночь`);
    setTextContent(cardElement.querySelector(`.popup__type`), window.data.getLivingType(pin));
    setTextContent(cardElement.querySelector(`.popup__text--capacity`), window.data.getCapacity(pin));
    setTextContent(cardElement.querySelector(`.popup__features`), pin.offer.features);
    setTextContent(cardElement.querySelector(`.popup__description`), pin.offer.description);
    setTextTime(cardElement.querySelector(`.popup__text--time`), pin.offer.checkin, pin.offer.checkout);
    setAvatar(cardElement.querySelector(`.popup__avatar`), pin.author.avatar);

    return cardElement;
  };

  window.card = {
    renderAdvertising
  };

})();
