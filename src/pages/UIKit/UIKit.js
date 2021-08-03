import "./UIkit.scss"
import "./UIKit.pug"


import ButtonLike from "Main/components/button-like/buttonLike"
import ButtonPagination from "Components/pagination/pagination"
import Calendar from "Components/calendar/calendar"
import DropdownGuests from "Main/components/dropdown-guests/dropdownGuests"
import DropdownRooms from "Main/components/dropdown-rooms/dropdownRooms"
import ExpandItems from "Main/components/checkbox-expandable/expandItems"
import makeCarousels from "Main/components/room-carousel/roomCarousel"

import { paginationData_1 } from "Scripts/myData"
import { guestsData_1, guestsData_booking } from "Scripts/myData"
import { roomsData_1, roomsData_2 } from "Scripts/myData"

window.onload = function () {
    require("Components/range/range");
    require("Main/components/text-field/datasetHandler");
    require("Main/components/card-search/cardSearch");
    require("Main/components/card-booking/cardBooking");
    makeCarousels();

    let activateExpand = new ExpandItems();
    let likeButton_1 = new ButtonLike("buttonLike_1", 2);
    let likeButton_2 = new ButtonLike("buttonLike_2", 12);
    let likeButtons_3 = new ButtonLike("likes_author_1", 12);
    let pagination_formElements = new ButtonPagination(paginationData_1, "pagination_bar_1");
    
    let calendar_1 = new Calendar("calendar_1");
    let calendar_2 = new Calendar("calendar_2");
    let calendar_simple = new Calendar("calendar_simple")

    let guestsHandler_0 = new DropdownGuests("dropdown_guests_0", );
    let guestsHandler_1 = new DropdownGuests("dropdown_guests_1", guestsData_1);
    let guestsHandler_2 = new DropdownGuests("dropdown_guests_2", guestsData_booking);
    
    let roomsHandler = new DropdownRooms ("dropdown_rooms_1", roomsData_1);
    let roomsHandler_2 = new DropdownRooms ("dropdown_rooms_2", roomsData_2);
}