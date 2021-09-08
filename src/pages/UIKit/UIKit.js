import ButtonLike from 'Components/button-like/ButtonLike';
import ButtonPagination from 'Components/pagination/Pagination';
import Calendar from 'Components/calendar/Calendar';
import DropdownGuests from 'Components/dropdown-guests/DropdownGuests';
import DropdownRooms from 'Components/dropdown-rooms/DropdownRooms';
import ExpandItems from 'Components/checkbox-expandable/ExpandItems';
import makeCarousels from 'Components/room-carousel/RoomCarousel';
import {
  paginationData_1, guestsData_1, guestsData_booking, roomsData_1, roomsData_2,
} from 'Scripts/MyData';

import './UIkit.scss';
import './UIKit.pug';

window.onload = function () {
  require('Main/components/footer/ValidateFooterForm');
  require('Main/components/card-registration/ValidateRegistration');
  require('Main/components/card-singin/ValidateSignin');
  require('Main/components/card-search/CardSearch');
  require('Main/components/card-booking/CardBooking');
  require('Main/components/range/Range');
  require('Scripts/InputMasks');
  makeCarousels();

  const dropdownWatches = Array.from(document.querySelectorAll('.js-dropdown__watch'));
  dropdownWatches.forEach((item) => {
    new ExpandItems(item);
  });

  const likeButton_1 = new ButtonLike('buttonLike_1', 2);
  const likeButton_2 = new ButtonLike('buttonLike_2', 12);
  const likeButtons_3 = new ButtonLike('likes_author_1', 12);
  const pagination_formElements = new ButtonPagination(paginationData_1, 'pagination_bar_1');

  const calendar_1 = new Calendar('calendar_1');
  const calendar_2 = new Calendar('calendar_2');
  const calendar_simple = new Calendar('calendar_simple');

  const guestsHandler_0 = new DropdownGuests('dropdown_guests_0');
  const guestsHandler_1 = new DropdownGuests('dropdown_guests_1', guestsData_1);
  const guestsHandler_2 = new DropdownGuests('dropdown_guests_2', guestsData_booking);

  const roomsHandler = new DropdownRooms('dropdown_rooms_1', roomsData_1);
  const roomsHandler_2 = new DropdownRooms('dropdown_rooms_2', roomsData_2);
};
