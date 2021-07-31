import "./searchRoom.scss"
//import { Range } from "../../components/range/range"
import { renderCalendar } from "../../components/calendar/calendar";
import { DropdownRooms } from "../../components/dropdownRooms/dropdownRooms"
import { roomsData_1 } from "../../assets/scripts/myData"

import { DropdownGuests } from "../../components/dropdownGuests/dropdownGuests"
import { guestsData_searchRoom } from "../../assets/scripts/myData"

import { paginationData_1 } from "../../assets/scripts/myData"
import { ButtonPagination } from "../../components/pagination/pagination"

window.onload = function(){
    require("../../components/textField/datasetHandler");
    require("../../components/checkboxExpandable/checkboxExpandable");
    require("../../components/range/range");


    let calendar_booking = new renderCalendar("calendar_search");

    // require("../../components/card_search/card_search");
    let guests_searchRoom = new DropdownGuests("dropdown_guests_search", guestsData_searchRoom);

    //let range_search = new Range("range_search");
    let dropdownRooms_search = new DropdownRooms("dropdown_rooms_1", roomsData_1);

    let pagination_search = new ButtonPagination(paginationData_1, "pagination_search")

    require("../../components/roomCarousel/roomCarousel");
}
