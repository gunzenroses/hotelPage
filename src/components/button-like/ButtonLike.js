import { boundMethod } from 'autobind-decorator';

class ButtonLike {
  constructor(item) {
    this.buttonLike = item;
    this.init();
  }

  init() {
    this.createClasses();
    this.createChildren();
    this.enableEventListeners();
  }

  createClasses() {
    this.classNumber = 'button-like__number';
    this.classHeart = 'button-like__heart';
    this.classButton = 'button-like';
  }

  createChildren() {
    this.number = this.buttonLike.querySelector(`.js-${ this.classNumber }`);
    this.heart = this.buttonLike.querySelector(`.js-${ this.classHeart }`);
  }

  enableEventListeners() {
    this.buttonLike.addEventListener('click', this.render);
  }

  @boundMethod
  render() {
    const ifLiked = this.buttonLike.classList.contains(
      `${ this.classButton }_popular`
    );
    const data = parseInt(this.number.textContent, 10);
    this.number.textContent = ifLiked ? data - 1 : data + 1;
    this.buttonLike.classList.toggle(`${ this.classButton }_popular`);
    this.heart.classList.toggle(`${ this.classHeart }_popular`);
    this.number.classList.toggle(`${ this.classNumber }_popular`);
  }
}

export default ButtonLike;
