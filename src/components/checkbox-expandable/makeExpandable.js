import ExpandItems from './ExpandItems';

export default function makeExpandable() {
  const dropdownWatches = Array.from(document.querySelectorAll('.js-dropdown__detection'));
  dropdownWatches.forEach((item) => {
    new ExpandItems(item);
  });
}
