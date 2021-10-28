import 'Scripts/inputMasks';
import 'Components/card-booking/cardBooking';
import 'Main/components/card-registration/validateRegistration';
import 'Components/card-search/cardSearch';
import 'Main/components/card-singin/validateSignin';
import 'Main/components/footer/validateFooterForm';
import 'Components/range/range';
import makeButtonLike from 'Components/button-like/makeButtonLike';
import makeCalendar from 'Components/calendar/makeCalendar';
import makeExpandable from 'Main/assets/scripts/makeExpandable';
import makeGuestsOption from 'Components/dropdown/_type_guests/makeGuestsOption';
import makeRoomsOptions from 'Components/dropdown/_type_rooms/makeRoomsOptions';
import makeCarousel from 'Components/room-carousel/makeCarousel';
import makePagination from 'Components/pagination/makePagination';
import {
  paginationData1, guestsData1, guestsDataBooking, roomsData1, roomsData2,
} from 'Main/assets/scripts/myData';

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
