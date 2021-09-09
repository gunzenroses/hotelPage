import Calendar from 'Main/components/calendar/Calendar';
import DropdownGuests from 'Main/components/dropdown-guests/DropdownGuests';
import { guestsDataBooking } from 'Main/assets/scripts/MyData';

window.onload = () => {
  new Calendar('calendarBooking');
  new DropdownGuests('dropdown_guests_booking', guestsDataBooking);
};
