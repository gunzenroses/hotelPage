import applyClass from 'Scripts/applyClass';
import { guestsDataSearchRoom, roomsData1 } from 'Scripts/my-data';

import Calendar from 'Components/calendar/Calendar';
import DropdownGuests from 'Main/components/dropdown/_type_guests/DropdownGuests';
import DropdownRooms from 'Main/components/dropdown/_type_rooms/DropdownRooms';
import Expand from 'Components/expand/Expand';
import 'Components/footer/footer';
import Pagination from 'Components/pagination/Pagination';
import 'Components/range/range';
import RoomCarousel from 'Components/room-carousel/RoomCarousel';

import './search-room.scss';

window.onload = () => {
  applyClass('.js-calendar', Calendar);
  applyClass('.js-room-carousel', RoomCarousel);
  applyClass('.js-dropdown__detection', Expand);
  applyClass([{ id: 'dropdown_guests_search', data: guestsDataSearchRoom }], DropdownGuests);
  applyClass([{ id: 'paginationSearch' }], Pagination);
  applyClass([{ id: 'dropdown_rooms_1', data: roomsData1 }], DropdownRooms);
};
