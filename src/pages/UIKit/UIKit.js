import applyClass from 'Scripts/applyClass';
import 'Scripts/inputmasks';
import {
  guestsData1, guestsDataBooking, roomsData1, roomsData2,
} from 'Scripts/my-data';
import ButtonLike from 'Components/button-like/ButtonLike';
import Calendar from 'Main/components/calendar/Calendar';
import 'Components/card-booking/card-booking';
import 'Components/card-registration/card-registration';
import 'Components/card-search/card-search';
import 'Components/card-singin/card-signin';
import Expand from 'Main/components/expand/Expand';
import DropdownGuests from 'Components/dropdown/_type_guests/DropdownGuests';
import DropdownRooms from 'Components/dropdown/_type_rooms/DropdownRooms';
import 'Components/footer/footer';
import Pagination from 'Main/components/pagination/Pagination';
import 'Components/range/range';
import RoomCarousel from 'Components/room-carousel/RoomCarousel';

import './UIkit.scss';

window.onload = () => {
  applyClass('.js-room-carousel', RoomCarousel);
  applyClass('.js-dropdown__detection', Expand);
  applyClass('.js-button-like', ButtonLike);
  ['calendar1', 'calendar2', 'calendarSimple'].forEach((item) => applyClass(item, Calendar));
  applyClass('.js-dropdown__guests', DropdownGuests);
  applyClass('.js-pagination', Pagination);
  applyClass([
    { id: 'dropdown_rooms_1', data: roomsData1 },
    { id: 'dropdown_rooms_2', data: roomsData2 },
  ], DropdownRooms);
};
