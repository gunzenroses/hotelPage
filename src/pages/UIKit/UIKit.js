import "./UIkit.scss"
import "./UIKit.pug"
import likeButtons from "Main/components/button-like/buttonLike"
import paginationData_1 from "Scripts/myData"
import ButtonPagination from "Components/pagination/pagination"

import DropdownGuests from "Main/components/dropdown-guests/dropdownGuests"
import { guestsData_1, guestsData_booking } from "Scripts/myData"

import DropdownRooms from "Main/components/dropdown-rooms/dropdownRooms"
import { roomsData_1, roomsData_2 } from "Scripts/myData"
import renderCalendar from "Components/calendar/calendar"



window.onload = function () {
    require("Main/components/text-field/datasetHandler");
    require("Main/components/checkbox-expandable/checkboxExpandable");
    require("Main/components/room-carousel/roomCarousel");
    
    //for formElements
    let likeButton_1 = new likeButtons("buttonLike_1", 2);
    let likeButton_2 = new likeButtons("buttonLike_2", 12);
    let likeButtons_3 = new likeButtons("likes_author_1", 12);
    require("Components/range/range");

    let pagination_formElements = new ButtonPagination(paginationData_1, "pagination_bar_1");
    
    let guestsHandler_0 = new DropdownGuests("dropdown_guests_0", );
    let guestsHandler_1 = new DropdownGuests("dropdown_guests_1", guestsData_1);
    let guestsHandler_2 = new DropdownGuests("dropdown_guests_2", guestsData_booking);
    
    let roomsHandler = new DropdownRooms ("dropdown_rooms_1", roomsData_1);
    let roomsHandler_2 = new DropdownRooms ("dropdown_rooms_2", roomsData_2);

    let calendar_1 = new renderCalendar("calendar_1");
    let calendar_2 = new renderCalendar("calendar_2");
    
    // for cards
    require("Components/card_search/card_search");
    require("Components/card_booking/card_booking");
    let calendar_simple = new renderCalendar("calendar_simple")
}