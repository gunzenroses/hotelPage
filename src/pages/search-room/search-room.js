import "./searchRoom.scss"
//import { Range } from "Components/range/range"
import renderCalendar from "Components/calendar/calendar";
import DropdownRooms from "Components/dropdownRooms/dropdownRooms"
import { roomsData_1 } from "Scripts/myData"

import DropdownGuests from "Components/dropdownGuests/dropdownGuests"
import guestsData_searchRoom from "Scripts/myData"

import paginationData_1 from "Scripts/myData"
import ButtonPagination from "Components/pagination/pagination"

window.onload = function(){
    require("Components/textField/datasetHandler");
    require("Components/checkboxExpandable/checkboxExpandable");
    require("Components/range/range");


    let calendar_booking = new renderCalendar("calendar_search");

    // require("Components/card_search/card_search");
    let guests_searchRoom = new DropdownGuests("dropdown_guests_search", guestsData_searchRoom);

    //let range_search = new Range("range_search");
    let dropdownRooms_search = new DropdownRooms("dropdown_rooms_1", roomsData_1);

    let pagination_search = new ButtonPagination(paginationData_1, "pagination_search")

    require("Components/roomCarousel/roomCarousel");
}
