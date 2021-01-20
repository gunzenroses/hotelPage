import { Dropdown, renderCalendar, DropdownGuests } from "../../assets/scripts/myLibrary"
import { guestsData_2 } from "../../assets/scripts/myData"

let dateDropdown_4 = new Dropdown("dataRange_4", ".container__dataRange", ".dropdown__calendar")
let calendar_4 = new renderCalendar("calendar_dataRange_4");

let guestsHandler_4 = new DropdownGuests("dropdown_guests_4", ".dropdown__guests", guestsData_2);