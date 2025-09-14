class AutoAudioPlayer {
  constructor() {
    this.audio = document.getElementById('startup-sound');
    this.attemptCount = 0;
    this.maxAttempts = 5;
    this.retryDelay = 300;
    
    if (!this.audio) {
      console.error("Audio element not found");
      return;
    }

    this.init();
  }

  init() {
    this.audio.volume = 0.3;
    this.audio.muted = false;
    this.audio.setAttribute('playsinline', ''); 

    if (this.isIOS()) {
      this.handleIOS();
    } else if (this.isChrome()) {
      this.handleChrome();
    } else {
      this.attemptPlayback();
    }
  }

  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  isChrome() {
    return /Chrome/.test(navigator.userAgent);
  }

  handleIOS() {
    document.addEventListener('touchstart', this.iosPlayHandler.bind(this), { once: true });
    document.addEventListener('click', this.iosPlayHandler.bind(this), { once: true });
  }

  iosPlayHandler() {
    this.audio.play()
      .then(() => console.log("iOS playback started"))
      .catch(e => console.error("iOS playback failed:", e));
  }

  handleChrome() {
    this.audio.muted = true;
    this.audio.play()
      .then(() => {
        this.audio.muted = false;
        console.log("Chrome muted autoplay succeeded");
      })
      .catch(e => {
        console.log("Chrome muted autoplay failed, trying normal:", e);
        this.audio.muted = false;
        this.attemptPlayback();
      });
  }

  attemptPlayback() {
    if (this.attemptCount >= this.maxAttempts) {
      console.log("Max playback attempts reached");
      return;
    }

    this.attemptCount++;
    
    this.audio.play()
      .then(() => {
        console.log(`Playback succeeded on attempt ${this.attemptCount}`);
      })
      .catch(error => {
        console.log(`Attempt ${this.attemptCount} failed:`, error);
        
        setTimeout(() => {
          this.attemptPlayback();
        }, this.retryDelay * this.attemptCount);
      });
  }
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    new AutoAudioPlayer();
  }
});