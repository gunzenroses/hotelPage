import "./search_room.scss"
import { Range } from "../../components/range/range"
import { DropdownRooms } from "../../components/dropdownRooms/dropdownRooms"
import { roomsData_1 } from "../../assets/scripts/myData"

import { paginationData_1 } from "../../assets/scripts/myData"
import { ButtonPagination } from "../../components/pagination/pagination"

import { roomsMaker_data } from "../../assets/scripts/roomsMaker_data"
import { roomsMaker } from "../../components/card__room/roomsMaker"

window.onload = function () {
    require("../../components/textField/datasetHandler");
    require("../../components/checkboxExpandable/checkboxExpandable");

    require("../../components/card__search/search");
    let range_search = new Range("range_search");
    let dropdownRooms_search = new DropdownRooms("dropdown_rooms_1", roomsData_1);

    let pagination_search = new ButtonPagination(paginationData_1, "pagination_search")
    
    let classic = new roomsMaker(roomsMaker_data)

    require("../../components/roomCarousel/roomCarousel");
}
