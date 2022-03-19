import { boundMethod } from 'autobind-decorator';

class ButtonLike {
  constructor(item) {
    this.buttonLike = item;
    this.init();
  }

  init() {
    this._createClasses();
    this._createChildren();
    this._enableEventListeners();
  }

  _createClasses() {
    this.classNumber = 'button-like__number';
    this.classHeart = 'button-like__heart';
    this.classButton = 'button-like';
  }

  _createChildren() {
    this.number = this.buttonLike.querySelector(`.js-${ this.classNumber }`);
    this.heart = this.buttonLike.querySelector(`.js-${ this.classHeart }`);
  }

  _enableEventListeners() {
    this.buttonLike.addEventListener('pointerup', this._render);
  }

  @boundMethod
  _render() {
    const liked = this.buttonLike.classList.contains(
      `${ this.classButton }_popular`
    );
    const data = parseInt(this.number.textContent, 10);
    this.number.textContent = liked ? data - 1 : data + 1;
    this.buttonLike.classList.toggle(`${ this.classButton }_popular`);
    this.heart.classList.toggle(`${ this.classHeart }_popular`);
    this.number.classList.toggle(`${ this.classNumber }_popular`);
  }
}

export default ButtonLike;
