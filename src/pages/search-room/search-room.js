import 'Main/components/footer/footer';
import 'Components/range/range';
import Calendar from 'Main/components/calendar/calendar';
import Carousel from 'Main/components/room-carousel/room-carousel';
import applyClass from 'Main/assets/scripts/apply-class';
import { guestsDataSearchRoom, roomsData1 } from 'Main/assets/scripts/my-data';

import './search-room.scss';
import ExpandItems from 'Main/assets/scripts/expand-items';
import DropdownGuests from 'Main/components/dropdown/_type_guests/dropdown_type_guests';
import DropdownRooms from 'Main/components/dropdown/_type_rooms/dropdown_type_rooms';
import ButtonPagination from 'Main/components/pagination/pagination';

window.onload = () => {
  applyClass('.js-calendar', Calendar);
  applyClass('.js-room-carousel', Carousel);
  applyClass('.js-dropdown__detection', ExpandItems);
  applyClass([{ id: 'dropdown_guests_search', data: guestsDataSearchRoom }], DropdownGuests);
  applyClass([{ id: 'paginationSearch' }], ButtonPagination);
  applyClass([{ id: 'dropdown_rooms_1', data: roomsData1 }], DropdownRooms);
};
