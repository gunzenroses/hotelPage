import Calendar from 'Main/components/calendar/Calendar';
import applyClass from 'Main/assets/scripts/applyClass';
import DropdownGuests from 'Components/dropdown/_type_guests/dropdown_type_guests';
import { guestsDataBooking } from 'Main/assets/scripts/my-data';

applyClass('.js-calendar', Calendar);
applyClass([{ id: 'dropdown_guests_booking', data: guestsDataBooking }], DropdownGuests);
