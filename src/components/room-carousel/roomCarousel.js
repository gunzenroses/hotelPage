export default function makeCarousels() {
  let carousels = document.querySelectorAll(".js-room-carousel");
  for (let carousel of carousels) {
    new Carousel(carousel);
  }
}

class Carousel {
  constructor(carousel) {
    this.carousel = carousel;
    this.carouselInputs = this.carousel.getElementsByClassName("js-room-carousel__radio")[0];
    this.carouselInputs.querySelectorAll(".js-room-carousel__radio_real")[0].checked = true;
    this.carouselPictures = this.carousel.querySelector(".js-room-carousel__pictures");
    this.carouselPictures.style.left = 0;
    this.init();
  }

  init() {
    this.creatChildren();
    this.setupHandlers();
    this.enable();
  }

  creatChildren() {
    this.leftValue = parseInt(this.carouselPictures.style.left);
    this.carouselPrev = this.carousel.querySelector(".js-room-carousel__btn_prev")
      ? this.carousel.querySelector(".js-room-carousel__btn_prev")
      : null;
    this.carouselNext = (this.carousel.querySelector(".js-room-carousel__btn_next"))
      ? this.carousel.querySelector(".js-room-carousel__btn_next")
      : null;
    let radioRow = this.carouselInputs.querySelectorAll(".js-room-carousel__radio_real");
    this.firstPic = radioRow[0];
    this.secondPic = radioRow[1];
    this.thirdPic = radioRow[2];
    this.forthPic = radioRow[3];
  }

  setupHandlers() {
    this.prevImageHandler = this.prevImage.bind(this);
    this.nextImgHandler = this.nextImage.bind(this);
    this.switchImageHandler = this.switchImage.bind(this);
  }

  enable() {
    if (this.carouselPrev) this.carouselPrev.addEventListener("click", this.prevImageHandler)
    if (this.carouselNext) this.carouselNext.addEventListener("click", this.nextImgHandler)
    this.carouselInputs.addEventListener("click", () => { this.switchImageHandler; })
  }

  prevImage() {
    this.leftValue += 100;
    switch (this.leftValue) {
      case 0:
        this.firstPic.checked = true;
        this.carouselPictures.style.left = this.leftValue + "%";
        break;
      case -100: this.secondPic.checked = true;
        this.carouselPictures.style.left = this.leftValue + "%";
        break;
      case -200: this.thirdPic.checked = true;
        this.carouselPictures.style.left = this.leftValue + "%";
        break;
      case 100: 
        this.leftValue = -300;
        this.forthPic.checked = true;
        this.carouselPictures.style.left = this.leftValue + "%";
        break;
    }
  }

  nextImage() {
    this.leftValue -= 100;
    switch (this.leftValue) {
      case -400: 
        this.leftValue = 0;
        this.firstPic.checked = true;
        this.carouselPictures.style.left = this.leftValue + "%";
        break;
      case -100: 
        this.secondPic.checked = true;
        this.carouselPictures.style.left = this.leftValue + "%";
        break;
      case -200: 
        this.thirdPic.checked = true;
        this.carouselPictures.style.left = this.leftValue + "%";
        break;
      case -300: 
        this.forthPic.checked = true;
        this.carouselPictures.style.left = this.leftValue + "%";
        break;
    }
  }

  switchImage(e) {
    switch (e.target.value) {
      case "picture_1": this.leftValue = 0; break;
      case "picture_2": this.leftValue = -100; break;
      case "picture_3": this.leftValue = -200; break;
      case "picture_4": this.leftValue = -300; break;
    }
    this.carouselPictures.style.left = this.leftValue + "%";
  }
}