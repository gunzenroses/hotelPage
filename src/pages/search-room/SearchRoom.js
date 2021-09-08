import ButtonPagination from 'Components/pagination/Pagination';
import Calendar from 'Components/calendar/Calendar';
import DropdownRooms from 'Components/dropdown-rooms/DropdownRooms';
import DropdownGuests from 'Components/dropdown-guests/DropdownGuests';
import ExpandItems from 'Components/checkbox-expandable/ExpandItems';
import makeCarousels from 'Components/room-carousel/RoomCarousel';
import { guestsData_searchRoom, roomsData_1, paginationData_1 } from 'Scripts/MyData';

import './search-room.scss';

window.onload = function () {
  require('Components/footer/ValidateFooterForm');
  require('Components/range/Range');
  makeCarousels();

  const pagination_search = new ButtonPagination(paginationData_1, 'pagination_search');
  const calendar_booking = new Calendar('calendar_search');
  const guests_searchRoom = new DropdownGuests('dropdown_guests_search', guestsData_searchRoom);
  const dropdownRooms_search = new DropdownRooms('dropdown_rooms_1', roomsData_1);
  const activateExpand = new ExpandItems();
};
