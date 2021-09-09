import DropdownGuests from './DropdownGuests';

export default function makeGuestsOption(items) {
  items.forEach((item) => {
    new DropdownGuests(item.id, item.data);
  });
}
