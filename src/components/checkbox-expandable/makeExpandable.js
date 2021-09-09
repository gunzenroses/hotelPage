import ExpandItems from './ExpandItems';

window.onload = () => {
  console.log(2);
  const dropdownWatches = Array.from(document.querySelectorAll('.js-dropdown__watch'));
  dropdownWatches.forEach((item) => {
    new ExpandItems(item);
  });
};
