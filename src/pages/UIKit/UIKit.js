import "./UIkit.scss"
import "./UIKit.pug"
import { likeButtons } from "../../components/buttonLike/buttonLike"
import { Range } from "../../components/range/range"
import { paginationData_1 } from "../../assets/scripts/myData"
import { ButtonPagination } from "../../components/pagination/pagination"

import { DropdownGuests } from "../../components/dropdownGuests/dropdownGuests"
import { guestsData_1, guestsData_booking } from "../../assets/scripts/myData"

import { DropdownRooms } from "../../components/dropdownRooms/dropdownRooms"
import { roomsData_1, roomsData_2 } from "../../assets/scripts/myData"

import { renderCalendar } from "../../components/calendar/calendar"



window.onload = function () {
    require("../../components/textField/datasetHandler");
    require("../../components/checkboxExpandable/checkboxExpandable");
    require("../../components/roomCarousel/roomCarousel");
    
    //for formElements
    let likeButton_1 = new likeButtons("buttonLike_1", 2);
    let likeButton_2 = new likeButtons("buttonLike_2", 12);
    let likeButtons_3 = new likeButtons("likes_author_1", 12);
    let range_1 = new Range("range_1");
    let pagination_formElements = new ButtonPagination(paginationData_1, "pagination_bar_1");
    
    let guestsHandler_0 = new DropdownGuests("dropdown_guests_0", );
    let guestsHandler_1 = new DropdownGuests("dropdown_guests_1", guestsData_1);
    let guestsHandler_2 = new DropdownGuests("dropdown_guests_2", guestsData_booking);
    
    let roomsHandler = new DropdownRooms ("dropdown_rooms_1", roomsData_1);
    let roomsHandler_2 = new DropdownRooms ("dropdown_rooms_2", roomsData_2);

    let calendar_1 = new renderCalendar("calendar_1");
    let calendar_2 = new renderCalendar("calendar_2");
    
    // for cards
    require("../../components/card__search/search");
    require("../../components/card__booking/booking");
    let calendar_simple = new renderCalendar("calendar_simple")
    
}