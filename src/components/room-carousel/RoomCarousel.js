import { boundMethod } from "autobind-decorator";

class RoomCarousel {
  constructor(carousel) {
    this.carousel = carousel;
    this.init();
  }

  init() {
    this.createChildren();
    this.enable();
  }

  createChildren() {
    this.carouselInputs = this.carousel.getElementsByClassName(
      "js-room-carousel__radio"
    )[0];
    this.carouselPictures = this.carousel.querySelector(
      ".js-room-carousel__pictures"
    );
    this.carouselPictures.style.left = 0;
    this.leftValue = parseInt(this.carouselPictures.style.left, 10);
    this.carouselPrev = this.carousel.querySelector(
      ".js-room-carousel__button_prev"
    )
      ? this.carousel.querySelector(".js-room-carousel__button_prev")
      : null;
    this.carouselNext = this.carousel.querySelector(
      ".js-room-carousel__button_next"
    )
      ? this.carousel.querySelector(".js-room-carousel__button_next")
      : null;
    this.carouselRow = this.carouselInputs.getElementsByClassName(
      "js-room-carousel__radio-real"
    );
    this.firstPicRadio = this.carouselRow[0];
    this.secondPicRadio = this.carouselRow[1];
    this.thirdPicRadio = this.carouselRow[2];
    this.forthPicRadio = this.carouselRow[3];
    this.firstPicRadio.checked = true;
  }

  enable() {
    if (this.carouselPrev) {
      this.carouselPrev.addEventListener("click", this.prevImage);
    }
    if (this.carouselNext) {
      this.carouselNext.addEventListener("click", this.nextImage);
    }
    this.carouselInputs.addEventListener("click", this.switchImage);
  }

  @boundMethod
  prevImage() {
    this.leftValue += 100;
    switch (this.leftValue) {
      case -100:
        this.secondPicRadio.checked = true;
        this.carouselPictures.style.left = `${ this.leftValue }%`;
        break;
      case -200:
        this.thirdPicRadio.checked = true;
        this.carouselPictures.style.left = `${ this.leftValue }%`;
        break;
      case 100:
        this.leftValue = -300;
        this.forthPicRadio.checked = true;
        this.carouselPictures.style.left = `${ this.leftValue }%`;
        break;
      default:
        this.firstPicRadio.checked = true;
        this.carouselPictures.style.left = `${ this.leftValue }%`;
        break;
    }
  }

  @boundMethod
  nextImage() {
    this.leftValue -= 100;
    switch (this.leftValue) {
      case -100:
        this.secondPicRadio.checked = true;
        this.carouselPictures.style.left = `${ this.leftValue }%`;
        break;
      case -200:
        this.thirdPicRadio.checked = true;
        this.carouselPictures.style.left = `${ this.leftValue }%`;
        break;
      case -300:
        this.forthPicRadio.checked = true;
        this.carouselPictures.style.left = `${ this.leftValue }%`;
        break;
      default:
        this.leftValue = 0;
        this.firstPicRadio.checked = true;
        this.carouselPictures.style.left = `${ this.leftValue }%`;
        break;
    }
  }

  @boundMethod
  switchImage(e) {
    switch (e.target.value) {
      case "picture_2":
        this.leftValue = -100;
        break;
      case "picture_3":
        this.leftValue = -200;
        break;
      case "picture_4":
        this.leftValue = -300;
        break;
      default:
        this.leftValue = 0;
        break;
    }
    this.carouselPictures.style.left = `${this.leftValue}%`;
  }
}

export default RoomCarousel;
