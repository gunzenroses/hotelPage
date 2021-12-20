import Calendar from 'Main/components/calendar/Calendar';
import applyClass from 'Main/assets/scripts/applyClass';
import DropdownGuests from 'Main/components/dropdown/_type_guests/DropdownGuests';
import { guestsDataBooking } from 'Main/assets/scripts/my-data';

applyClass('.js-calendar', Calendar);
applyClass([{ id: 'dropdown_guests_booking', data: guestsDataBooking }], DropdownGuests);
