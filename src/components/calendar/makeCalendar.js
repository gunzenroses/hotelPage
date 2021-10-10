import Calendar from './calendar';

export default function makeCalendar() {
  const items = document.querySelectorAll('.js-calendar');
  items.forEach((item) => {
    new Calendar(item);
  });
}
