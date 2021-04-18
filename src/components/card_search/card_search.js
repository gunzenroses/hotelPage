// this exemplar will work for all pages

import { renderCalendar } from "../calendar/calendar"
import { DropdownGuests } from "../dropdownGuests/dropdownGuests"
import { guestsData_search } from "../../assets/scripts/myData"


let guestsHandler_search = new DropdownGuests("dropdown_guests_search", guestsData_search);
let calendar_search = new renderCalendar("calendar_search");