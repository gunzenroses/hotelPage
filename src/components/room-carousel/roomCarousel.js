export default function makeCarousels() {
  let carousels = document.querySelectorAll(".room-carousel");
  for (let carousel of carousels) {
    new Carousel(carousel);
  }
}

class Carousel {
  constructor(carousel) {
    this.carousel = carousel;
    this.carouselInputs = this.carousel.getElementsByClassName("room-carousel__radio")[0];
    this.carouselInputs.querySelectorAll(".room-carousel__radio_real")[0].checked = true;
    this.carouselPictures = this.carousel.querySelector(".room-carousel__pictures");
    this.carouselPictures.style.left = 0;
    this.leftValue = this.carouselPictures.style.left;
    this.init();
  }

  init() {
    this.creatChildren();
    this.setupHandlers();
    this.enable();
  }

  creatChildren() {
    this.carouselPrev = this.carousel.querySelector(".room-carousel__btn_prev")
      ? this.carousel.querySelector(".room-carousel__btn_prev")
      : null;
    console.log(this.carouselPrev)
    this.carouselNext = (this.carousel.querySelector(".room-carousel__btn_next"))
      ? this.carousel.querySelector(".room-carousel__btn_next")
      : null;
  }

  setupHandlers() {
    this.prevImageHandler = this.prevImage.bind(this);
    this.nextImgHandler = this.nextImage.bind(this);
    this.switchImageHandler = this.switchImage.bind(this);
  }

  enable() {
    if (this.carouselPrev) this.carouselPrev.addEventListener("click", () => { this.prevImageHandler; })
    if (this.carouselNext) this.carouselNext.addEventListener("click", () => { this.nextImgHandler; })
    this.carouselInputs.addEventListener("click", () => { this.switchImageHandler; })
  }

  prevImage() {
    leftValue += 100;
    switch (leftValue) {
      case 0:
        this.carouselInputs.querySelectorAll(".room-carousel__radio_real")[0].checked = true;
        this.carouselPictures.style.left = leftValue + "%";
        break;
      case -100: this.carouselInputs.querySelectorAll(".room-carousel__radio_real")[1].checked = true;
        this.carouselPictures.style.left = leftValue + "%";
        break;
      case -200: this.carouselInputs.querySelectorAll(".room-carousel__radio_real")[2].checked = true;
        this.carouselPictures.style.left = leftValue + "%";
        break;
      case 100: leftValue = -300;
        this.carouselInputs.querySelectorAll(".room-carousel__radio_real")[3].checked = true;
        this.carouselPictures.style.left = leftValue + "%";
        break;
    }
  }

  nextImage() {
    leftValue -= 100;
    switch (leftValue) {
      case -400: leftValue = 0;
        this.carouselInputs.querySelectorAll(".room-carousel__radio_real")[0].checked = true;
        this.carouselPictures.style.left = leftValue + "%";
        break;
      case -100: this.carouselInputs.querySelectorAll(".room-carousel__radio_real")[1].checked = true;
        this.carouselPictures.style.left = leftValue + "%";
        break;
      case -200: this.carouselInputs.querySelectorAll(".room-carousel__radio_real")[2].checked = true;
        this.carouselPictures.style.left = leftValue + "%";
        break;
      case -300: this.carouselInputs.querySelectorAll(".room-carousel__radio_real")[3].checked = true;
        this.carouselPictures.style.left = leftValue + "%";
        break;
    }
  }

  switchImage(e) {
    switch (e.target.value) {
      case "picture_1": leftValue = 0; break;
      case "picture_2": leftValue = -100; break;
      case "picture_3": leftValue = -200; break;
      case "picture_4": leftValue = -300; break;
    }
    this.carouselPictures.style.left = leftValue + "%";
  }
}