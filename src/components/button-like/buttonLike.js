export default class ButtonLike {
  constructor(containerId, data) {
    this.likeButton = document.getElementById(containerId)
    this.data = parseInt(data, 10)
    this.init()
  }

  init() {
    this.createChildren();
    this.render();
    this.enableHandlers();
    this.enableEventListeners();
  }

  createChildren() {
    this.number = this.likeButton.querySelector('.button-like__number');
    this.heart = this.likeButton.querySelector('.button-like__heart');
  }

  enableHandlers() {
    this.buttonLikeIncreaseHandler = this.buttonLikeIncrease.bind(this);
  }

  enableEventListeners() {
    this.likeButton.addEventListener('click', this.buttonLikeIncreaseHandler)
  }

  buttonLikeIncrease() {
    this.data++;
    this.render();
  }

  render() {
    this.number.textContent = this.data;
    if (parseInt(this.number.textContent) > 9) {
      this.likeButton.classList.add("button-like_popular");
      this.heart.classList.add("button-like__heart_popular");
    }
  }
}