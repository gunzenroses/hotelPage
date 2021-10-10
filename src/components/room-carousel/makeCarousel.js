import Carousel from './roomCarousel';

export default function makeCarousel() {
  const carousels = document.querySelectorAll('.js-room-carousel');
  carousels.forEach((carousel) => new Carousel(carousel));
}
