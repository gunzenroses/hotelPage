// this exemplar will work for all pages
import Calendar from "Components/calendar/calendar";
import DropdownGuests from "Main/components/dropdown-guests/dropdownGuests";
import guestsData_search from "Scripts/myData";

let guestsHandler_search = new DropdownGuests("dropdown_guests_search", guestsData_search);
let calendar_search = new Calendar("calendar_search");