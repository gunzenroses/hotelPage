import { DropdownGuests, DropdownRooms } from "./myLibrary"
import { guestsData_1, guestsData_2, roomsData_1, roomsData_2 } from "./myData"

let roomsHandler = new DropdownRooms ("dropdown_rooms_1", ".dropdown__rooms", roomsData_1);
let roomsHandler_2 = new DropdownRooms ("dropdown_rooms_2", ".dropdown__rooms", roomsData_2);

let guestsHandler = new DropdownGuests("dropdown_guests_1", ".dropdown__guests", guestsData_1);
let guestsHandler_2 = new DropdownGuests("dropdown_guests_2", ".dropdown__guests", guestsData_2);