import applyClass from 'Main/assets/scripts/applyClass';
import { guestsDataSearchRoom, roomsData1 } from 'Main/assets/scripts/my-data';
import Calendar from 'Main/components/calendar/Calendar';
import Expand from 'Main/components/expand/Expand';
import DropdownGuests from 'Components/dropdown/_type_guests/dropdown_type_guests';
import DropdownRooms from 'Components/dropdown/_type_rooms/dropdown_type_rooms';
import 'Components/footer/footer';
import ButtonPagination from 'Main/components/pagination/Pagination';
import 'Components/range/range';
import RoomCarousel from 'Main/components/room-carousel/RoomCarousel';

import './search-room.scss';

window.onload = () => {
  applyClass('.js-calendar', Calendar);
  applyClass('.js-room-carousel', RoomCarousel);
  applyClass('.js-dropdown__detection', Expand);
  applyClass([{ id: 'dropdown_guests_search', data: guestsDataSearchRoom }], DropdownGuests);
  applyClass([{ id: 'paginationSearch' }], ButtonPagination);
  applyClass([{ id: 'dropdown_rooms_1', data: roomsData1 }], DropdownRooms);
};
