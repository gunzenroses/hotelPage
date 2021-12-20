export default class ButtonLike {
  constructor(containerId, data) {
    this.data = parseInt(data, 10);
    this.init(containerId);
  }

  init(id) {
    this.createChildren(id);
    this.render();
    this.enableHandlers();
    this.enableEventListeners();
  }

  createChildren(id) {
    this.likeButton = document.getElementById(id);
    this.number = this.likeButton.querySelector('.js-button-like__number');
    this.heart = this.likeButton.querySelector('.js-button-like__heart');
  }

  enableHandlers() {
    this.buttonLikeIncreaseHandler = this.buttonLikeIncrease.bind(this);
  }

  enableEventListeners() {
    this.likeButton.addEventListener('click', this.buttonLikeIncreaseHandler);
  }

  buttonLikeIncrease() {
    this.data = this.data + 1;
    this.render();
  }

  render() {
    this.number.textContent = this.data;
    if (parseInt(this.number.textContent, 10) > 9) this.makePopularClass();
  }

  makePopularClass() {
    this.likeButton.classList.add('js-button-like_popular');
    this.heart.classList.add('js-button-like__heart_popular');
  }
}
