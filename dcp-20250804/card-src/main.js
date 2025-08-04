import videojs from 'video.js';

// 時間フォーマット関数
function formatTime (seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins.toString().padStart(2, '0')}:${secs.toString().
    padStart(2, '0')}`;
}

const setupMainVideo = () => {
  const player = videojs('main_video', {
    audioOnlyMode: true,
    autoplay: false, // 自動再生を無効
    fluid: true, // 動画コンテンツを親要素いっぱいに広げる
    height: 'auto',
    loop: false, // 繰り返し再生無効
    controls: false, // コントローラ表示
    preload: 'auto', // videoタグがロードされた瞬間に動画をダウンロード
    playbackRates: [1], // [0.5, 1, 1.3, 1.5], // 再生速度の倍率
    languages: {
      ja: {
        'Play': '再生',
        'Pause': '停止',
        'Play Video': '再生',
        'Mute': '消音',
        'Playback Rate': '再生速度',
        'Picture-in-Picture': 'ピクチャインピクチャ',
        'Fullscreen': '全画面表示',
        'Non-Fullscreen': '通常表示',
      },
    }, // 日本語の言語対応
    language: 'ja', // 言語を日本語に設定
    width: '100%',
  }, function () {});

  // DOM要素を取得
  const playPauseBtn = document.getElementById('playPauseBtn');
  const currentTimeSpan = document.getElementById('currentTime');
  const durationSpan = document.getElementById('duration');
  const volumeSlider = document.getElementById('volumeSlider');
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');
  const progressHandle = document.getElementById('progressHandle');

  // プレーヤーの準備完了時
  player.ready(() => {
    console.log('Video.js プレーヤーが準備完了');

    // 動画の長さが取得できたら表示を更新
    player.on('loadedmetadata', () => {
      durationSpan.textContent = formatTime(player.duration());
    });
  });

  // 再生/停止ボタンのイベント
  playPauseBtn.addEventListener('click', () => {
    if (player.paused()) {
      player.play();
      playPauseBtn.textContent = '停止';
    } else {
      player.pause();
      playPauseBtn.textContent = '再生';
    }
  });

  // プレーヤーの再生状態変更時
  player.on('play', () => {
    playPauseBtn.textContent = '停止';
  });

  player.on('pause', () => {
    playPauseBtn.textContent = '再生';
  });

  // 時間の更新
  player.on('timeupdate', () => {
    const current = player.currentTime();
    const duration = player.duration();

    currentTimeSpan.textContent = formatTime(current);

    if (duration > 0) {
      const progress = (current / duration) * 100;
      progressBar.style.width = progress + '%';
      progressHandle.style.left = progress + '%';
    }
  });

  // 音量スライダー
  volumeSlider.addEventListener('input', (e) => {
    player.volume(parseFloat(e.target.value));
  });

  // プログレスバーのクリック
  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = clickX / rect.width;
    const duration = player.duration();

    if (duration > 0) {
      player.currentTime(duration * progress);
    }
  });

  // プログレスハンドルのドラッグ
  let isDragging = false;

  progressHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (! isDragging) {
      return;
    }

    const rect = progressContainer.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const progress = clickX / rect.width;
    const duration = player.duration();

    if (duration > 0) {
      progressBar.style.width = (progress * 100) + '%';
      progressHandle.style.left = (progress * 100) + '%';
      player.currentTime(duration * progress);
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // エラーハンドリング
  player.on('error', (error) => {
    console.error('Video.js エラー:', error);
  });

  return player;
};

document.addEventListener('DOMContentLoaded', () => {
  const mainVideoPayer = setupMainVideo();

  const elVideoPanel = document.querySelector('.js-video-panel');

  const elSkipVideo = document.querySelector('.js-skip-video');
  elSkipVideo.onclick = () => mainVideoPayer.currentTime(30);

  const elCloseVideoPanel = document.querySelector('.js-close-video-panel');
  elCloseVideoPanel.onclick = () => {
    mainVideoPayer.currentTime(0);

    // NOTE: ビデオパネルの全面表示解除
    elVideoPanel.style.display = 'none';
    document.body.classList.remove('locked_scroll');
  };

  const elIntroVideo = document.querySelector('.js-intro-video');
  elIntroVideo.addEventListener('click', () => {
    // NOTE: ビデオパネルの全面表示
    elVideoPanel.style.display = 'block';
    document.body.classList.add('locked_scroll');

    const timeupdateCallback = () => {
      const current = mainVideoPayer.currentTime();

      // NOTE: 15秒でスキップボタンを表示
      if (current >= 15) {
        elSkipVideo.style.visibility = 'visible';
      } else {
        elSkipVideo.style.visibility = 'hidden';
      }

      // TODO: 30秒で動画選択ボタンを表示
      // TODO: 30秒でリプレイボタンを表示
    };
    mainVideoPayer.off('timeupdate', timeupdateCallback);
    mainVideoPayer.on('timeupdate', timeupdateCallback);

    mainVideoPayer.play();
  });
})
