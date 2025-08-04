import videojs from 'video.js';
document.addEventListener('DOMContentLoaded', () => {

  const openModal = (modal) => {
    const body = document.body;
    // const scrollY = window.scrollY;
    modal.style.display = 'block';
    body.classList.add('locked_scroll');
    // body.style.top = `-${scrollY}px`;
  };

  const closeModal = (modal) => {
    const body = document.body;
    // const scrollY = body.style.top;
    modal.style.display = 'none';
    body.classList.remove('locked_scroll');
    // body.style.top = '';
    // window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  const elIntroVideo = document.querySelector('.js-intro');
  elIntroVideo.addEventListener('click', () => {
    const elMediaQuiz = document.querySelector('.js-media-quiz');
    openModal(elMediaQuiz);

    const mainVideoPayer = videojs('main_video', {
      audioOnlyMode: true,
      autoplay: true, // 自動再生を無効
      fluid: true, // 動画コンテンツを親要素いっぱいに広げる
      height: 'auto',
      loop: true, // 繰り返し再生無効
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
          'Non-Fullscreen': '通常表示'
        }
      }, // 日本語の言語対応
      language: 'ja', // 言語を日本語に設定
      width: '100%',
    }, function() {})

    // DOM要素を取得
    const playPauseBtn = document.getElementById('playPauseBtn');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressHandle = document.getElementById('progressHandle');

    // 時間フォーマット関数
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // プレーヤーの準備完了時
    mainVideoPayer.ready(() => {
      console.log('Video.js プレーヤーが準備完了');

      // 動画の長さが取得できたら表示を更新
      mainVideoPayer.on('loadedmetadata', () => {
        durationSpan.textContent = formatTime(mainVideoPayer.duration());
      });
    });

    // 再生/停止ボタンのイベント
    playPauseBtn.addEventListener('click', () => {
      if (mainVideoPayer.paused()) {
        mainVideoPayer.play();
        playPauseBtn.textContent = '停止';
      } else {
        mainVideoPayer.pause();
        playPauseBtn.textContent = '再生';
      }
    });

    // プレーヤーの再生状態変更時
    mainVideoPayer.on('play', () => {
      playPauseBtn.textContent = '停止';
    });

    mainVideoPayer.on('pause', () => {
      playPauseBtn.textContent = '再生';
    });

    const elVideoEnd = document.querySelector('.js-video-end');
    elVideoEnd.addEventListener('click', () => {
      mainVideoPayer.currentTime(30);
    });

    const elReturn = document.querySelector('.js-return');
    elReturn.addEventListener('click', () => {
      closeModal(elMediaQuiz);
    })

    // 時間の更新
    mainVideoPayer.on('timeupdate', () => {
      const current = mainVideoPayer.currentTime();
      const duration = mainVideoPayer.duration();

      currentTimeSpan.textContent = formatTime(current);

      if (duration > 0) {
        const progress = (current / duration) * 100;
        progressBar.style.width = progress + '%';
        progressHandle.style.left = progress + '%';
      }

      // TODO: 15秒で結末ボタンを表示
      if (current >= 15) {
        elVideoEnd.style.visibility = 'visible';
      } else {
        elVideoEnd.style.visibility = 'hidden';
      }

      // TODO: 30秒で動画選択ボタンを表示
      // TODO: 30秒でリプレイボタンを表示
    });

    // 音量スライダー
    volumeSlider.addEventListener('input', (e) => {
      mainVideoPayer.volume(parseFloat(e.target.value));
    });

    // プログレスバーのクリック
    progressContainer.addEventListener('click', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const progress = clickX / rect.width;
      const duration = mainVideoPayer.duration();

      if (duration > 0) {
        mainVideoPayer.currentTime(duration * progress);
      }
    });

    // プログレスハンドルのドラッグ
    let isDragging = false;

    progressHandle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const rect = progressContainer.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const progress = clickX / rect.width;
      const duration = mainVideoPayer.duration();

      if (duration > 0) {
        progressBar.style.width = (progress * 100) + '%';
        progressHandle.style.left = (progress * 100) + '%';
        mainVideoPayer.currentTime(duration * progress);
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // エラーハンドリング
    mainVideoPayer.on('error', (error) => {
      console.error('Video.js エラー:', error);
    });
  });
})
