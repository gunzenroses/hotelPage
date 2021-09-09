import 'Components/footer/ValidateFooterForm';
import 'Components/range/Range';
import 'Components/room-carousel/makeCarousel';
import 'Components/checkbox-expandable/makeExpandable';
import 'Components/calendar/makeCalendar';
import makeGuestsOption from 'Components/dropdown-guests/makeGuestsOption';
import makeRoomsOptions from 'Components/dropdown-rooms/makeRoomsOptions';
import makePagination from 'Components/pagination/makePagination';
import { guestsDataSearchRoom, roomsData1 } from 'Main/assets/scripts/MyData';

import './search-room.scss';

window.onload = () => {
  makeGuestsOption([{ id: 'dropdown_guests_search', data: guestsDataSearchRoom }]);
  makeRoomsOptions([{ id: 'dropdown_rooms_1', data: roomsData1 }]);
  makePagination([{ id: 'paginationSearch' }]);
};
