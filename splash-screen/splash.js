(() => {
  document.addEventListener('DOMContentLoaded', () => {
    startSplash();
  });

  function startSplash () {
    const elSplash = document.querySelector('.js-splash');
    elSplash.classList.remove('splash--hidden');
    elSplash.dataset.loading = '1';

    const promises = [];
    const elImages = document.querySelectorAll('img[data-src].js-required-in-first-view');
    elImages.forEach(elImage => {
      const p = loadImage(elImage);
      promises.push(p);
    });

    Promise.all(promises).then((/** @type HTMLImageElement[] */ elImages) => {
      elSplash.classList.add('splash--hidden');
      elSplash.dataset.loading = '0';
    });
  }

  function loadImage (/** @type {HTMLImageElement} */ elImage) {
    return new Promise(async (resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        elImage.setAttribute('src', elImage.dataset.src);
        elImage.removeAttribute('data-src');
        resolve(elImage);
      };
      image.onerror = ev => reject(ev);
      image.src = elImage.dataset.src;
    });
  }
})();
