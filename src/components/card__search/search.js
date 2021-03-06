// this exemplar will work for all pages

import { renderCalendar, DropdownGuests } from "../../assets/scripts/myLibrary"
import { guestsData_search } from "../../assets/scripts/myData"


let guestsHandler_search = new DropdownGuests("dropdown_guests_search", ".dropdown__guests", guestsData_search);
let calendar_search = new renderCalendar("calendar_search");