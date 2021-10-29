import Calendar from 'Components/calendar/calendar';
import applyClass from 'Scripts/apply-class';
import DropdownGuests from 'Components/dropdown/_type_guests/dropdown_type_guests';
import { guestsDataBooking } from 'Scripts/my-data';

applyClass('.js-calendar', Calendar);
applyClass([{ id: 'dropdown_guests_booking', data: guestsDataBooking }], DropdownGuests);
