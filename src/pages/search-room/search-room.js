import applyClass from 'Scripts/apply-class';
import { guestsDataSearchRoom, roomsData1 } from 'Scripts/my-data';
import Calendar from 'Components/calendar/calendar';
import Expand from 'Main/components/expand/expand';
import DropdownGuests from 'Components/dropdown/_type_guests/dropdown_type_guests';
import DropdownRooms from 'Components/dropdown/_type_rooms/dropdown_type_rooms';
import 'Components/footer/footer';
import ButtonPagination from 'Components/pagination/pagination';
import 'Components/range/range';
import Carousel from 'Components/room-carousel/room-carousel';

import './search-room.scss';

window.onload = () => {
  applyClass('.js-calendar', Calendar);
  applyClass('.js-room-carousel', Carousel);
  applyClass('.js-dropdown__detection', Expand);
  applyClass([{ id: 'dropdown_guests_search', data: guestsDataSearchRoom }], DropdownGuests);
  applyClass([{ id: 'paginationSearch' }], ButtonPagination);
  applyClass([{ id: 'dropdown_rooms_1', data: roomsData1 }], DropdownRooms);
};
