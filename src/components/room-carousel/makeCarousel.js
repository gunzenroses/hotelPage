import Carousel from './RoomCarousel';

window.onload = () => {
  const carousels = document.querySelectorAll('.js-room-carousel');
  carousels.forEach((carousel) => new Carousel(carousel));
};
