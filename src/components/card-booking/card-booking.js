import Calendar from 'Components/calendar/calendar';
import applyClass from 'Main/assets/scripts/apply-class';
import DropdownGuests from 'Main/components/dropdown/_type_guests/dropdown_type_guests';
import { guestsDataBooking } from 'Main/assets/scripts/my-data';

applyClass('.js-calendar', Calendar);
applyClass([{ id: 'dropdown_guests_booking', data: guestsDataBooking }], DropdownGuests);
