class Lock {

  constructor() {
    this.pin = '1234';
    this.setupDom();
    this.setupFlickity();
    this.setupAudio();
    this.onResize();
    this.listen();
  }

  listen() {
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (window.innerWidth % 2 === 0) {
      this.dom.lock.style.marginLeft = '0px';
    } else {
      this.dom.lock.style.marginLeft = '1px';
    }
  }

  onChange() {
    this.sounds.select.play();
    this.code = this.getCode();
    this.dom.code.textContent = this.code;
    if (this.code === this.pin) {
      this.verified = true;
      this.dom.lock.classList.add('verified');
      this.dom.status.textContent = 'UNLOCKED';
      this.sounds.success.play();
    } else {
      this.dom.lock.classList.remove('verified');
      this.dom.status.textContent = 'LOCKED';
      if (this.verified) {
        this.sounds.fail.play();
      }
      this.verified = false;
    }
  }

  getCode() {
    let code = '';
    for (let i = 0, len = this.dom.rows.length; i < len; i++) {
      let cell = this.dom.rows[i].querySelector('.is-selected .text');
      let num = cell.textContent;
      code += num;
    }
    return code;
  }

  setupDom() {
    this.dom = {};
    this.dom.lock = document.querySelector('.lock');
    this.dom.rows = document.querySelectorAll('.row');
    this.dom.code = document.querySelector('.code');
    this.dom.status = document.querySelector('.status');
  }

  setupAudio() {
    this.sounds = {};

    this.sounds.select = new Howl({
      src: [
      'https://jackrugile.com/sounds/misc/lock-button-1.mp3',
      'https://jackrugile.com/sounds/misc/lock-button-1.ogg'],

      volume: 0.5,
      rate: 1.4 });


    this.sounds.prev = new Howl({
      src: [
      'https://jackrugile.com/sounds/misc/lock-button-4.mp3',
      'https://jackrugile.com/sounds/misc/lock-button-4.ogg'],

      volume: 0.5,
      rate: 1 });


    this.sounds.next = new Howl({
      src: [
      'https://jackrugile.com/sounds/misc/lock-button-4.mp3',
      'https://jackrugile.com/sounds/misc/lock-button-4.ogg'],

      volume: 0.5,
      rate: 1.2 });


    this.sounds.hover = new Howl({
      src: [
      'https://jackrugile.com/sounds/misc/lock-button-1.mp3',
      'https://jackrugile.com/sounds/misc/lock-button-1.ogg'],

      volume: 0.2,
      rate: 3 });


    this.sounds.success = new Howl({
      src: [
      'https://jackrugile.com/sounds/misc/lock-online-1.mp3',
      'https://jackrugile.com/sounds/misc/lock-online-1.ogg'],

      volume: 0.5,
      rate: 1 });


    this.sounds.fail = new Howl({
      src: [
      'https://jackrugile.com/sounds/misc/lock-fail-1.mp3',
      'https://jackrugile.com/sounds/misc/lock-fail-1.ogg'],

      volume: 0.6,
      rate: 1 });

  }

  setupFlickity() {
    for (let i = 0, len = this.dom.rows.length; i < len; i++) {
      let row = this.dom.rows[i];
      let flkty = new Flickity(row, {
        selectedAttraction: 0.25,
        friction: 0.9,
        cellAlign: 'center',
        pageDots: false,
        wrapAround: true });

      flkty.lastIndex = 0;

      flkty.on('select', () => {
        if (flkty.selectedIndex !== flkty.lastIndex) {
          this.onChange();
        }
        flkty.lastIndex = flkty.selectedIndex;
      });

      row.addEventListener('mouseenter', () => {
        this.sounds.hover.play();
      });
    }

    this.dom.prevNextBtns = this.dom.lock.querySelectorAll('.flickity-prev-next-button');
    for (let i = 0, len = this.dom.prevNextBtns.length; i < len; i++) {
      let btn = this.dom.prevNextBtns[i];
      btn.addEventListener('click', () => {
        if (btn.classList.contains('previous')) {
          this.sounds.prev.play();
        } else {
          this.sounds.next.play();
        }
      });
    }
  }}



let lock = new Lock();