import { Dropdown, renderCalendar, DropdownGuests } from "../../assets/scripts/myLibrary"
import { guestsData_3 } from "../../assets/scripts/myData"


let dateDropdown_3 = new Dropdown("dataRange_3", ".container__dataRange", ".dropdown__calendar")
let guestsHandler_3 = new DropdownGuests("dropdown_guests_3", ".dropdown__guests", guestsData_3);
let renderCalendar_3 = new renderCalendar("calendar_3");