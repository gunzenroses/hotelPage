import 'Main/assets/scripts/InputMasks';
import 'Components/footer/ValidateFooterForm';
import 'Components/card-singin/ValidateSignin';
import 'Components/card-registration/ValidateRegistration';
import 'Components/card-booking/CardBooking';
import 'Components/card-search/CardSearch';
import 'Components/range/Range';
import makeCarousel from 'Components/room-carousel/makeCarousel';
import makeExpandable from 'Components/checkbox-expandable/makeExpandable';
import makeButtonLike from 'Components/button-like/makeButtonLike';
import makePagination from 'Components/pagination/makePagination';
import makeCalendar from 'Components/calendar/makeCalendar';
import makeGuestsOption from 'Components/dropdown-guests/makeGuestsOption';
import makeRoomsOptions from 'Main/components/dropdown-rooms/makeRoomsOptions';

import {
  paginationData1, guestsData1, guestsDataBooking, roomsData1, roomsData2,
} from 'Scripts/MyData';

import './UIkit.scss';
import './UIKit.pug';

window.onload = () => {
  makeExpandable();
  makeCarousel();
  makeButtonLike([
    { id: 'likes_author_1', data: 12 },
    { id: 'buttonLike_2', data: 12 },
    { id: 'buttonLike_1', data: 2 },
  ]);

  makeCalendar('calendar1', 'calendar2', 'calendarSimple');
  makePagination([{ id: 'pagination_bar_1', data: paginationData1 }]);
  makeGuestsOption([
    { id: 'dropdown_guests_0' },
    { id: 'dropdown_guests_1', data: guestsData1 },
    { id: 'dropdown_guests_2', data: guestsDataBooking },
  ]);
  makeRoomsOptions([
    { id: 'dropdown_rooms_1', data: roomsData1 },
    { id: 'dropdown_rooms_2', data: roomsData2 },
  ]);
};
