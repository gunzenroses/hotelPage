import Calendar from './Calendar';

export default function makeCalendar() {
  const items = document.querySelectorAll('.js-calendar');
  items.forEach((item) => {
    new Calendar(item);
  });
}
