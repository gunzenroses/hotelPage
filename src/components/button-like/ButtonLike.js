class ButtonLike {
  constructor(item) {
    this.buttonLike = item;
    this.init();
  }

  init() {
    this.createChildren();
    this.render();
    this.enableHandlers();
    this.enableEventListeners();
  }

  createChildren() {
    this.number = this.buttonLike.querySelector('.js-button-like__number');
    this.data = parseInt(this.number.textContent, 10);
    this.heart = this.buttonLike.querySelector('.js-button-like__heart');
  }

  enableHandlers() {
    this.buttonLikeIncreaseHandler = this.buttonLikeIncrease.bind(this);
  }

  enableEventListeners() {
    this.buttonLike.addEventListener('click', this.buttonLikeIncreaseHandler);
  }

  buttonLikeIncrease() {
    this.data += 1;
    this.render();
  }

  render() {
    this.number.textContent = this.data;
    if (parseInt(this.number.textContent, 10) > 9) this.makePopularClass();
  }

  makePopularClass() {
    this.buttonLike.classList.add('button-like_popular');
    this.heart.classList.add('button-like__heart_popular');
    this.number.classList.add('button-like__number_popular');
  }
}

export default ButtonLike;
