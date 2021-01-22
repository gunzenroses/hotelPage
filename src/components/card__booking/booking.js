import { renderCalendar, DropdownGuests } from "../../assets/scripts/myLibrary"
import { guestsData_2 } from "../../assets/scripts/myData"

let calendar_4 = new renderCalendar("calendar_dataRange_4");

let guestsHandler_4 = new DropdownGuests("dropdown_guests_4", ".dropdown__guests", guestsData_2);