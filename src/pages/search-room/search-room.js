import ButtonPagination from "Components/pagination/pagination";
import Calendar from "Components/calendar/calendar";
import DropdownRooms from "Components/dropdown-rooms/dropdownRooms";
import DropdownGuests from "Components/dropdown-guests/dropdownGuests";
import ExpandItems from "Components/checkbox-expandable/expandItems";
import makeCarousels from "Components/room-carousel/roomCarousel";
import { guestsData_searchRoom } from "Scripts/myData";
import { roomsData_1 } from "Scripts/myData";
import { paginationData_1 } from "Scripts/myData";

import "./search-room.scss";

window.onload = function(){
    require("Components/text-field/datasetHandler");
    require("Components/range/range");
    makeCarousels();

    let pagination_search = new ButtonPagination(paginationData_1, "pagination_search")
    let calendar_booking = new Calendar("calendar_search");
    let guests_searchRoom = new DropdownGuests("dropdown_guests_search", guestsData_searchRoom);
    let dropdownRooms_search = new DropdownRooms("dropdown_rooms_1", roomsData_1);
    let activateExpand = new ExpandItems();
}
