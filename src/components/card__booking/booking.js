import { renderCalendar, DropdownGuests } from "../../assets/scripts/myLibrary"
import { guestsData_booking } from "../../assets/scripts/myData"

let calendar_booking = new renderCalendar("calendar_booking");
let dropdown_guests_booking = new DropdownGuests("dropdown_guests_booking", ".dropdown__guests", guestsData_booking);