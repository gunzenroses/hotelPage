import 'Scripts/input-masks';
import 'Components/card-booking/card-booking';
import 'Components/card-registration/card-registration';
import 'Components/card-search/card-search';
import 'Components/card-singin/card-signin';
import 'Components/footer/footer';
import 'Components/range/range';
import Calendar from 'Components/calendar/calendar';
import applyClass from 'Scripts/apply-class';
import Carousel from 'Components/room-carousel/room-carousel';
import {
  paginationData1, guestsData1, guestsDataBooking, roomsData1, roomsData2,
} from 'Scripts/my-data';
import ExpandItems from 'Scripts/expand-items';
import ButtonLike from 'Components/button-like/button-like';
import DropdownGuests from 'Components/dropdown/_type_guests/dropdown_type_guests';
import DropdownRooms from 'Main/components/dropdown/_type_rooms/dropdown_type_rooms';
import ButtonPagination from 'Components/pagination/pagination';

import './UIkit.scss';

window.onload = () => {
  applyClass('.js-room-carousel', Carousel);
  applyClass('.js-dropdown__detection', ExpandItems)
  applyClass([
    { id: 'likes_author_1', data: 12 },
    { id: 'buttonLike_2', data: 12 },
    { id: 'buttonLike_1', data: 2 },
  ], ButtonLike);
  ['calendar1', 'calendar2', 'calendarSimple'].forEach((item) => applyClass(item, Calendar));
  applyClass([
    { id: 'dropdown_guests_0' },
    { id: 'dropdown_guests_1', data: guestsData1 },
    { id: 'dropdown_guests_2', data: guestsDataBooking },
  ], DropdownGuests);
  applyClass([{ id: 'pagination_bar_1', data: paginationData1 }], ButtonPagination);
  applyClass([
    { id: 'dropdown_rooms_1', data: roomsData1 },
    { id: 'dropdown_rooms_2', data: roomsData2 },
  ], DropdownRooms);
};
