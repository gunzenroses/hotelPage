import Carousel from './RoomCarousel';

export default function makeCarousel() {
  const carousels = document.querySelectorAll('.js-room-carousel');
  carousels.forEach((carousel) => new Carousel(carousel));
}
