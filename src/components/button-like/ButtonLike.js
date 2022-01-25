import { boundMethod } from "autobind-decorator";

class ButtonLike {
  constructor(item) {
    this.buttonLike = item;
    this.init();
  }

  init() {
    this.createChildren();
    this.render();
    this.enableEventListeners();
  }

  createChildren() {
    this.number = this.buttonLike.querySelector(".js-button-like__number");
    this.data = parseInt(this.number.textContent, 10);
    this.heart = this.buttonLike.querySelector(".js-button-like__heart");
  }

  enableEventListeners() {
    this.buttonLike.addEventListener("click", this.render);
  }
  
  @boundMethod
  render() {
    this.number.textContent = this.heart.classList.contains(
      "button-like__heart_popular"
    ) ? this.data++ : this.data--;
    this.buttonLike.classList.toggle("button-like_popular");
    this.heart.classList.toggle("button-like__heart_popular");
    this.number.classList.toggle("button-like__number_popular");
  }
}

export default ButtonLike;