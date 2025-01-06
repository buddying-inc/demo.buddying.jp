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

    const splashPromises = [];

    // NOTE: スプラッシュ画面を最低5秒表示
    splashPromises.push(new Promise((resolve) => {
      setTimeout(() => {
        console.info('Splash 5sec timer.');
        resolve();
      }, 5000);
    }))

    // NOTE: スプラッシュ画面が解除されたときに最低限表示しておきたい画像の遅延読み込み
    const elImages = document.querySelectorAll('img[data-src].js-required-in-first-view');
    elImages.forEach(elImage => {
      const promise = loadImagePromise(elImage);
      splashPromises.push(promise);
    });

    // NOTE: 全てのプロミスが完了したらスプラッシュ画面を解除
    Promise.all(splashPromises).then(
      () => {
        if (elSplash.dataset.loading !== '1') {
          return;
        }

        console.info('Splash promise ended :)');
        elSplash.classList.add('splash--hidden');
        elSplash.dataset.loading = '0';
        callback();
      },
    );

    // NOTE: 6秒で強制的にスプラッシュ表示を解除
    setTimeout(() => {
      if (elSplash.dataset.loading !== '1') {
        return;
      }

      console.info('Splash force end :(');
      elSplash.classList.add('splash--hidden');
      elSplash.dataset.loading = '0';
      callback();
    }, 6000);
  }

  function loadImagePromise (/** @type {HTMLImageElement} */ elImage) {
    return new Promise(async (resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        console.info(elImage.dataset.src + ' is loaded!');
        elImage.setAttribute('src', elImage.dataset.src);
        elImage.removeAttribute('data-src');
        resolve(elImage);
      };
      image.onerror = ev => reject(ev);
      image.src = elImage.dataset.src;
    });
  }
})();
