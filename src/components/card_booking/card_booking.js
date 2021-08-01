import renderCalendar from "Components/calendar/calendar"
import DropdownGuests from "Main/components/dropdown-guests/dropdownGuests"
import guestsData_booking from "Scripts/myData"

let calendar_booking = new renderCalendar("calendar_booking");
let dropdown_guests_booking = new DropdownGuests("dropdown_guests_booking", guestsData_booking);