document.addEventListener('DOMContentLoaded', () => {

  // NOTE: メディアポップアップを表示する
  const showPopup = () => document.querySelector('.js-media-popup').
    classList.
    add('show');
  // NOTE: メディアポップアップを非表示にする
  const hidePopup = () => document.querySelector('.js-media-popup').
    classList.
    remove('show');
　// NOTE: 動画時間のフォーマット
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // NOTE: シーンを切り替える
  const switchScene = (/** @type {string|null} */ scheneId) => {
    const elCurrentScene = document.querySelector('.js-media-scene.current');
    if (elCurrentScene !== null) {
      elCurrentScene.classList.remove('current');
    }

    if (scheneId === null) {
      return;
    }

    const elScene = document.querySelector(
      '.js-media-scene[data-scene-id="' + scheneId + '"]');
    elScene.classList.add('current');
  };

  // NOTE: メイン：メディアCTAをクリックしたとき
  const elMediaCta = document.querySelector('.js-media-cta');
  elMediaCta.addEventListener('click', () => {
    elSkip.style.display = '';
    elMainVideo.currentTime = 0;
    elMainVideo.play();

    switchScene('1');
    showPopup();
  });

  // NOTE: シーン1
  const elScene1 = document.querySelector('.js-media-scene[data-scene-id="1"]');
  const elSkip = elScene1.querySelector('.js-skip');
  const elReturn = elScene1.querySelector('.js-return');
  elSkip.addEventListener('click', () => {
    elMainVideo.currentTime = 30;
  });
  elReturn.addEventListener('click', () => {
    elMainVideo.pause();

    switchScene(null);
    hidePopup();
  });

  // NOTE: シーン1 - ビデオ
  const elMainVideo = elScene1.querySelector('.js-main-video');
  elMainVideo.addEventListener('timeupdate', () => {
    const current = elMainVideo.currentTime;

    if (current > 30) {
      elMainVideo.pause();
      switchScene('2');

      return;
    }

    if (current >= 15) {
      elSkip.style.display = 'inline-block';

      return;
    }

    elSkip.style.display = '';
  });

  // NOTE: シーン1 - ビデオコントロール
  const elPlayOrPause = elScene1.querySelector('.js-play-or-pause');
  const elCurrentTime = elScene1.querySelector('.js-current-time');
  const elDuration = elScene1.querySelector('.js-duration');
  const elVolumeSlider = elScene1.querySelector('.js-volume-slider');
  const elProgressContainer = elScene1.querySelector('.js-progress-container');
  const elProgressBar = elScene1.querySelector('.js-progress-bar');
  const elProgressHandle = elScene1.querySelector('.js-progress-handle');
  // 動画の長さが取得できたら表示を更新
  elMainVideo.addEventListener('loadedmetadata', () => {
    elDuration.textContent = formatTime(elMainVideo.duration);
  });
  // 再生/停止ボタンのイベント
  elPlayOrPause.addEventListener('click', () => {
    if (elMainVideo.paused) {
      elMainVideo.play();
      elPlayOrPause.textContent = '停止';
    } else {
      elMainVideo.pause();
      elPlayOrPause.textContent = '再生';
    }
  });
  // プレーヤーの再生状態変更時
  elMainVideo.addEventListener('play', () => {
    elPlayOrPause.textContent = '停止';
  });
  elMainVideo.addEventListener('pause', () => {
    elPlayOrPause.textContent = '再生';
  });
  // 時間の更新
  elMainVideo.addEventListener('timeupdate', () => {
    const current = elMainVideo.currentTime;
    const duration = elMainVideo.duration;

    elCurrentTime.textContent = formatTime(current);

    if (duration > 0) {
      const progress = (current / duration) * 100;
      elProgressBar.style.width = progress + '%';
      elProgressHandle.style.left = progress + '%';
    }
  });
  // 音量スライダー
  elVolumeSlider.addEventListener('input', (e) => {
    if (elMainVideo.muted) {
      elMainVideo.muted = false;
    }

    elMainVideo.volume = parseFloat(e.target.value);
  });
  // プログレスバーのクリック
  elProgressContainer.addEventListener('click', (e) => {
    const rect = elProgressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = clickX / rect.width;
    const duration = elMainVideo.duration;
    if (duration > 0) {
      elMainVideo.currentTime = duration * progress;
    }
  });
  // プログレスハンドルのドラッグ
  let isDragging = false;
  elProgressHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });
  document.addEventListener('mousemove', (e) => {
    if (! isDragging) {
      return;
    }
    const rect = elProgressContainer.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const progress = clickX / rect.width;
    const duration = elMainVideo.duration;
    if (duration > 0) {
      elProgressBar.style.width = (progress * 100) + '%';
      elProgressHandle.style.left = (progress * 100) + '%';
      elMainVideo.currentTime = duration * progress;
    }
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
  // エラーハンドリング
  elMainVideo.addEventListener('error', (error) => {
    console.error('エラー:', error);
  });

  // NOTE: シーン2
  const elScene2 = document.querySelector('.js-media-scene[data-scene-id="2"]');
  const elReplay = elScene2.querySelector('.js-replay');
  elScene2.querySelectorAll('.js-option').forEach(elOption => {
    elOption.addEventListener('click', () => {
      elOptionVideo.src = elOption.dataset.videoUrl;
      elOptionVideo.currentTime = 0;
      elOptionVideo.play();

      switchScene('3');
    });
  });
  elReplay.addEventListener('click', () => {
    elSkip.style.display = '';
    elMainVideo.currentTime = 0;
    elMainVideo.play();

    switchScene('1');
  });

  // NOTE: シーン3
  const elScene3 = document.querySelector('.js-media-scene[data-scene-id="3"]');

  // NOTE: シーン3 - ビデオ
  const elOptionVideo = elScene3.querySelector('.js-option-video');
  elOptionVideo.addEventListener('ended', () => {
    elOptionVideo.pause();
    elOptionVideo.src = '';
    elOptionVideo.currentTime = 0;

    switchScene('4');
  });

  // NOTE: シーン4
  const elScene4 = document.querySelector('.js-media-scene[data-scene-id="4"]');
  const elFinish = elScene4.querySelector('.js-finish');
  const elAgain = elScene4.querySelector('.js-again');
  elFinish.addEventListener('click', () => {
    // TODO: ページ内スクロールをしてコンテンツを表示

    switchScene(null);
    hidePopup();
  });
  elAgain.addEventListener('click', () => {
    switchScene('2');
  });
});
