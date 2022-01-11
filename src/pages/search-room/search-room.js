import applyClass from 'Scripts/applyClass';
import Calendar from 'Main/components/calendar/Calendar';
import DropdownGuests from 'Components/dropdown/_type_guests/DropdownGuests';
import DropdownRooms from 'Components/dropdown/_type_rooms/DropdownRooms';
import Expand from 'Components/expand/Expand';
import 'Components/footer/footer';
import Pagination from 'Main/components/pagination/Pagination';
import 'Components/range/range';
import RoomCarousel from 'Components/room-carousel/RoomCarousel';

import './search-room.scss';

window.onload = () => {
  applyClass('.js-calendar', Calendar);
  applyClass('.js-room-carousel', RoomCarousel);
  applyClass('.js-dropdown__detection', Expand);
  applyClass('.js-dropdown__guests', DropdownGuests);
  applyClass('js-pagination', Pagination);
  applyClass('.js-dropdown__rooms', DropdownRooms);
};
