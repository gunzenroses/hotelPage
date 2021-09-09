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
    this.number = this.likeButton.querySelector('.js-b-l__n');
    this.heart = this.likeButton.querySelector('.js-b-l__h');
  }

  enableHandlers() {
    this.buttonLikeIncreaseHandler = this.buttonLikeIncrease.bind(this);
  }

  enableEventListeners() {
    this.likeButton.addEventListener('click', this.buttonLikeIncreaseHandler);
  }

  buttonLikeIncrease() {
    this.data += this.data;
    this.render();
  }

  render() {
    this.number.textContent = this.data;
    if (parseInt(this.number.textContent, 10) > 9) this.makePopularClass();
  }

  makePopularClass() {
    this.likeButton.classList.add('button-like_popular');
    this.heart.classList.add('button-like__heart_popular');
    this.heart.src = './assets/images/heart-active.svg';
  }
}
