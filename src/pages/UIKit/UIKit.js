import 'Scripts/InputMasks';
import 'Components/card-booking/CardBooking';
import 'Components/card-registration/ValidateRegistration';
import 'Components/card-search/CardSearch';
import 'Components/card-singin/ValidateSignin';
import 'Components/footer/ValidateFooterForm';
import 'Components/range/Range';
import makeButtonLike from 'Components/button-like/makeButtonLike';
import makeCalendar from 'Components/calendar/makeCalendar';
import makeExpandable from 'Components/checkbox-expandable/makeExpandable';
import makeGuestsOption from 'Components/dropdown-guests/makeGuestsOption';
import makeRoomsOptions from 'Components/dropdown-rooms/makeRoomsOptions';
import makeCarousel from 'Components/room-carousel/makeCarousel';
import makePagination from 'Components/pagination/makePagination';
import {
  paginationData1, guestsData1, guestsDataBooking, roomsData1, roomsData2,
} from 'Scripts/MyData';

import './UIkit.scss';

window.onload = () => {
  makeCarousel();
  makeExpandable();
  makeButtonLike([
    { id: 'likes_author_1', data: 12 },
    { id: 'buttonLike_2', data: 12 },
    { id: 'buttonLike_1', data: 2 },
  ]);
  makeCalendar('calendar1', 'calendar2', 'calendarSimple');
  makeGuestsOption([
    { id: 'dropdown_guests_0' },
    { id: 'dropdown_guests_1', data: guestsData1 },
    { id: 'dropdown_guests_2', data: guestsDataBooking },
  ]);
  makePagination([{ id: 'pagination_bar_1', data: paginationData1 }]);
  makeRoomsOptions([
    { id: 'dropdown_rooms_1', data: roomsData1 },
    { id: 'dropdown_rooms_2', data: roomsData2 },
  ]);
};
