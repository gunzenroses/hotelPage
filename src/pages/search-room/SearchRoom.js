import ButtonPagination from "Components/pagination/Pagination";
import Calendar from "Components/calendar/Calendar";
import DropdownRooms from "Components/dropdown-rooms/DropdownRooms";
import DropdownGuests from "Components/dropdown-guests/DropdownGuests";
import ExpandItems from "Components/checkbox-expandable/ExpandItems";
import makeCarousels from "Components/room-carousel/RoomCarousel";
import { guestsData_searchRoom } from "Scripts/MyData";
import { roomsData_1 } from "Scripts/MyData";
import { paginationData_1 } from "Scripts/MyData";

import "./search-room.scss";

window.onload = function () {
  require("Components/footer/ValidateFooterForm");
  require("Components/range/Range");
  makeCarousels();

  let pagination_search = new ButtonPagination(paginationData_1, "pagination_search")
  let calendar_booking = new Calendar("calendar_search");
  let guests_searchRoom = new DropdownGuests("dropdown_guests_search", guestsData_searchRoom);
  let dropdownRooms_search = new DropdownRooms("dropdown_rooms_1", roomsData_1);
  let activateExpand = new ExpandItems();
}
