import DropdownGuests from './dropdownGuests';

export default function makeGuestsOption(items) {
  items.forEach((item) => {
    new DropdownGuests(item.id, item.data);
  });
}
