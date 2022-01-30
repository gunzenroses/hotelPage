import { boundMethod } from 'autobind-decorator';

class ButtonLike {
  constructor(item) {
    this.buttonLike = item;
    this.init();
  }

  init() {
    this.createChildren();
    this.enableEventListeners();
  }

  createChildren() {
    this.number = this.buttonLike.querySelector('.js-button-like__number');
    this.heart = this.buttonLike.querySelector('.js-button-like__heart');
  }

  enableEventListeners() {
    this.buttonLike.addEventListener('click', this.render);
  }

  @boundMethod
  render() {
    const ifLiked = this.buttonLike.classList.contains('button-like_popular');
    const data = parseInt(this.number.textContent, 10);
    this.number.textContent = ifLiked ? data - 1 : data + 1;
    this.buttonLike.classList.toggle('button-like_popular');
    this.heart.classList.toggle('button-like__heart_popular');
    this.number.classList.toggle('button-like__number_popular');
  }
}

export default ButtonLike;
