import Calendar from "Components/calendar/Calendar";
import DropdownGuests from "Components/dropdown-guests/DropdownGuests";
import { guestsData_booking } from "Scripts/MyData";

let calendar_booking = new Calendar("calendar_booking");
let dropdown_guests_booking = new DropdownGuests("dropdown_guests_booking", guestsData_booking);