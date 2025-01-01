(() => {
  document.addEventListener('DOMContentLoaded', () => {
    startSplash(() => {
      console.info('HELLO WORLD!');
    });
  });

  function startSplash (/** @type {Function} */ callback) {
    const elSplash = document.querySelector('.js-splash');
    if (elSplash.dataset.loading === '0') {
      elSplash.classList.remove('splash--hidden');
      elSplash.dataset.loading = '1';
    }

    const loadImagePromises = [];
    const elImages = document.querySelectorAll('img[data-src].js-required-in-first-view');
    elImages.forEach(elImage => {
      const promise = loadImagePromise(elImage);
      loadImagePromises.push(promise);
    });

    Promise.all(loadImagePromises).then(
      (/** @type HTMLImageElement[] */ elImages) => {
        if (elSplash.dataset.loading === '1') {
          elSplash.classList.add('splash--hidden');
          elSplash.dataset.loading = '0';
          callback();
        }
      },
    );

    // NOTE: 5秒で強制的にスプラッシュ表示を解除
    setTimeout(() => {
      if (elSplash.dataset.loading === '1') {
        elSplash.classList.add('splash--hidden');
        elSplash.dataset.loading = '0';
        callback();
      }
    }, 5000);
  }

  function loadImagePromise (/** @type {HTMLImageElement} */ elImage) {
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
