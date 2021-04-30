import "./UIkit.scss"
import "./UIKit.pug"
import { likeButtons } from "../../components/buttonLike/buttonLike"
//import { Range } from "../../components/range/range"
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
    //let range_1 = new Range("range_1");

    require('webpack-jquery-ui/slider');
    
    $( function() {
        $("#range_1" ).slider({
            range: true,
            min: 0,
            max: 15000,
            values: [ 5000, 10000 ],
            animate: "fast",
            slide: function( event, ui ) {
                $( "#amount" ).val(ui.values[ 0 ] + "₽ - " + ui.values[ 1 ] + "₽" );
            }
            });
        $( "#amount" ).val( $( "#range_1" ).slider( "values", 0 ) +
            "₽ - " + $( "#range_1" ).slider( "values", 1 ) + "₽");
        } );


    let pagination_formElements = new ButtonPagination(paginationData_1, "pagination_bar_1");
    
    let guestsHandler_0 = new DropdownGuests("dropdown_guests_0", );
    let guestsHandler_1 = new DropdownGuests("dropdown_guests_1", guestsData_1);
    let guestsHandler_2 = new DropdownGuests("dropdown_guests_2", guestsData_booking);
    
    let roomsHandler = new DropdownRooms ("dropdown_rooms_1", roomsData_1);
    let roomsHandler_2 = new DropdownRooms ("dropdown_rooms_2", roomsData_2);

    let calendar_1 = new renderCalendar("calendar_1");
    let calendar_2 = new renderCalendar("calendar_2");
    
    // for cards
    require("../../components/card_search/card_search");
    require("../../components/card_booking/card_booking");
    let calendar_simple = new renderCalendar("calendar_simple")
}