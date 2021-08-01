import "./search-room.scss"

import ButtonPagination from "Components/pagination/pagination"
import Calendar from "Components/calendar/calendar";
import DropdownRooms from "Main/components/dropdown-rooms/dropdownRooms"
import DropdownGuests from "Main/components/dropdown-guests/dropdownGuests"
import ExpandItems from "Main/components/checkbox-expandable/expandItems"

import guestsData_searchRoom from "Scripts/myData"
import { roomsData_1 } from "Scripts/myData"
import { paginationData_1 } from "Scripts/myData"

window.onload = function(){
    require("Main/components/text-field/datasetHandler");
    require("Components/range/range");
    require("Main/components/room-carousel/roomCarousel");

    let pagination_search = new ButtonPagination(paginationData_1, "pagination_search")
    let calendar_booking = new Calendar("calendar_search");
    let guests_searchRoom = new DropdownGuests("dropdown_guests_search", guestsData_searchRoom);
    let dropdownRooms_search = new DropdownRooms("dropdown_rooms_1", roomsData_1);
    let activateExpand = new ExpandItems();
}
