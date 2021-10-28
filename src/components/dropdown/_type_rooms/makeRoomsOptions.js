import DropdownRooms from './dropdownRooms';

export default function makeRoomsOptions(items) {
  items.forEach((item) => {
    new DropdownRooms(item.id, item.data);
  });
}
