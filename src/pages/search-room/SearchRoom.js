import 'Main/components/footer/validateFooterForm';
import 'Components/range/range';
import makeCalendar from 'Components/calendar/makeCalendar';
import makeExpandable from 'Components/checkbox-expandable/makeExpandable';
import makeGuestsOption from 'Components/dropdown-guests/makeGuestsOption';
import makeRoomsOptions from 'Components/dropdown-rooms/makeRoomsOptions';
import makePagination from 'Components/pagination/makePagination';
import makeCarousel from 'Components/room-carousel/makeCarousel';
import { guestsDataSearchRoom, roomsData1 } from 'Main/assets/scripts/myData';

import './search-room.scss';

window.onload = () => {
  makeCalendar();
  makeCarousel();
  makeExpandable();
  makeGuestsOption([{ id: 'dropdown_guests_search', data: guestsDataSearchRoom }]);
  makePagination([{ id: 'paginationSearch' }]);
  makeRoomsOptions([{ id: 'dropdown_rooms_1', data: roomsData1 }]);
};
