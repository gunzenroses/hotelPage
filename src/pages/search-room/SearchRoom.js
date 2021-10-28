import 'Main/components/footer/validateFooterForm';
import 'Components/range/range';
import makeCalendar from 'Components/calendar/makeCalendar';
import makeExpandable from 'Main/assets/scripts/makeExpandable';
import makeGuestsOption from 'Components/dropdown/_type_guests/makeGuestsOption';
import makeRoomsOptions from 'Components/dropdown/_type_rooms/makeRoomsOptions';
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
