import applyClass from 'Scripts/applyClass';
import { guestsDataBooking } from 'Scripts/my-data';
import Calendar from 'Main/components/calendar/Calendar';
import DropdownGuests from 'Components/dropdown/_type_guests/DropdownGuests';

applyClass('.js-calendar', Calendar);
applyClass([{ id: 'dropdown_guests_booking', data: guestsDataBooking }], DropdownGuests);
