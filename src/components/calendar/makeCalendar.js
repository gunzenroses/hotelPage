import Calendar from './Calendar';

export default () => {
  const items = document.querySelectorAll('.calendar');
  items.forEach((item) => {
    new Calendar(item);
  });
};
