// 時間フォーマット関数
function formatTime (seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins.toString().padStart(2, '0')}:${secs.toString().
    padStart(2, '0')}`;
}

const setupMainVideo = () => {
  const elVideo = document.querySelector('.js-main-video');
  // DOM要素を取得
  const elVideoControl = document.querySelector('.js-video-controls');
  const elPlayOrPause = elVideoControl.querySelector('.js-play-or-pause');
  const elCurrentTime = elVideoControl.querySelector('.js-current-time');
  const elDuration = elVideoControl.querySelector('.js-duration');
  const elVolumeSlider = elVideoControl.querySelector('.js-volume-slider');
  const elProgressContainer = elVideoControl.querySelector(
    '.js-progress-container');
  const elProgressBar = elVideoControl.querySelector('.js-progress-bar');
  const elProgressHandle = elVideoControl.querySelector('.js-progress-handle');

  // 動画の長さが取得できたら表示を更新
  elVideo.addEventListener('loadedmetadata', () => {
    elDuration.textContent = formatTime(elVideo.duration);
  });

  // 再生/停止ボタンのイベント
  elPlayOrPause.addEventListener('click', () => {
    if (elVideo.paused) {
      elVideo.play();
      elPlayOrPause.textContent = '停止';
    } else {
      elVideo.pause();
      elPlayOrPause.textContent = '再生';
    }
  });

  // プレーヤーの再生状態変更時
  elVideo.addEventListener('play', () => {
    elPlayOrPause.textContent = '停止';
  });

  elVideo.addEventListener('pause', () => {
    elPlayOrPause.textContent = '再生';
  });

  // 時間の更新
  elVideo.addEventListener('timeupdate', () => {
    const current = elVideo.currentTime;
    const duration = elVideo.duration;

    elCurrentTime.textContent = formatTime(current);

    if (duration > 0) {
      const progress = (current / duration) * 100;
      elProgressBar.style.width = progress + '%';
      elProgressHandle.style.left = progress + '%';
    }
  });

  // 音量スライダー
  elVolumeSlider.addEventListener('input', (e) => {
    elVideo.volume = parseFloat(e.target.value);
  });

  // プログレスバーのクリック
  elProgressContainer.addEventListener('click', (e) => {
    const rect = elProgressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = clickX / rect.width;
    const duration = elVideo.duration;

    if (duration > 0) {
      elVideo.currentTime = duration * progress;
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
    const duration = elVideo.duration;

    if (duration > 0) {
      elProgressBar.style.width = (progress * 100) + '%';
      elProgressHandle.style.left = (progress * 100) + '%';
      elVideo.currentTime = duration * progress;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // エラーハンドリング
  elVideo.addEventListener('error', (error) => {
    console.error('エラー:', error);
  });

  return elVideo;
};

document.addEventListener('DOMContentLoaded', () => {
  const elMainVideo = setupMainVideo();

  const elVideoPanel = document.querySelector('.js-video-panel');

  const elSkipVideo = document.querySelector('.js-skip-video');
  elSkipVideo.onclick = () => elMainVideo.currentTime = 30;

  const elSubVideoPanel = document.querySelector('.js-sub-video-panel');

  const elReplayVideo = document.querySelector('.js-replay-video');
  elReplayVideo.onclick = () => {
    elMainVideo.currentTime = 0;
    elMainVideo.play();
  };

  const elCloseVideoPanel = document.querySelector('.js-close-video-panel');
  elCloseVideoPanel.onclick = () => {
    elMainVideo.currentTime = 0;
    elMainVideo.removeEventListener('timeupdate', mainVideoTimeupdateCallback);

    // NOTE: ビデオパネルの全面表示解除
    elVideoPanel.style.display = 'none';
    document.body.classList.remove('locked_scroll');
  };

  const mainVideoTimeupdateCallback = () => {
    const current = elMainVideo.currentTime;

    // NOTE: 15秒でスキップボタンを表示
    elSkipVideo.style.visibility = current >= 15 ? 'visible' : 'hidden';

    // NOTE: 30秒で動画選択とリプレイボタンを表示
    if (current >= 30) {
      elMainVideo.pause();
      elSubVideoPanel.style.display = 'block';
    } else {
      elSubVideoPanel.style.display = 'none';
    }
  };

  const elShortVideo = document.querySelector('.js-short-video');
  elShortVideo.addEventListener('click', () => {
    // NOTE: ビデオパネルの全面表示
    elVideoPanel.style.display = 'block';
    document.body.classList.add('locked_scroll');

    // NOTE: メインビデオを再生開始
    elMainVideo.addEventListener('timeupdate', mainVideoTimeupdateCallback);
    elMainVideo.play();
  });

  // ・メイン動画30秒後
  // 　- サブ動画3個表示
  //　 - レプレーボタン表示

  // ・レプレーボタンクリック
  // 　- サブ動画非表示
  //　 - メイン動画再生

  // ・サブ動画クリック
  // 　- サブ動画再生開始

  // ・サブ動画再生完了
  // 　- "SOCK CODE でクーポン配布中" テキスト表示。
  // 　- 戻る（もう一度動画を選ぶ）表示。

  // ・"SOCK CODE でクーポン配布中" クリック
  // 　- モーダルを全て閉じ、ページ内スクロール

  // ・"戻る" クリック
  // 　- メイン動画30秒後 と同じ状態に戻る

  // レイヤー
  // body
  //   ∟ レイヤー1：メイン動画とプレーヤコントロール
  //   ∟ レイヤー2：動画が3つ
  //   ∟ レイヤー3：選択した動画を再生 & 再生後の誘導

  const elSubVideoList = document.querySelector('.js-sub-video-list');

  const elSubVideo1 = document.querySelector('.js-sub-video1');
  elSubVideo1.addEventListener('click', () => {
    elSubVideo1.startTime = 0;
    elSubVideo1.play();
  });
  elSubVideo1.addEventListener('ended', () => {
    elSubVideoList.style.display = 'none';
    elReplayVideo.style.display = 'none';
  });
});
