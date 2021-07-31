// this exemplar will work for all pages
import renderCalendar from "Components/calendar/calendar"
import DropdownGuests from "Components/dropdownGuests/dropdownGuests"
import guestsData_search from "Scripts/myData"


let guestsHandler_search = new DropdownGuests("dropdown_guests_search", guestsData_search);
let calendar_search = new renderCalendar("calendar_search");