import { renderCalendar } from "../calendar/calendar"
import { DropdownGuests } from "../dropdownGuests/dropdownGuests"
import { guestsData_booking } from "../../assets/scripts/myData"

let calendar_booking = new renderCalendar("calendar_booking");
let dropdown_guests_booking = new DropdownGuests("dropdown_guests_booking", guestsData_booking);