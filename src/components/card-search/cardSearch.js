// this exemplar will work for all pages
import Calendar from "Components/calendar/Calendar";
import DropdownGuests from "Components/dropdown-guests/DropdownGuests";
import guestsData_search from "Scripts/MyData";

let guestsHandler_search = new DropdownGuests("dropdown_guests_search", guestsData_search);
let calendar_search = new Calendar("calendar_search");