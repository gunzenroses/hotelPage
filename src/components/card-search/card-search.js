// this exemplar will work for all pages
import Calendar from 'Components/calendar/calendar';
import applyClass from 'Main/assets/scripts/apply-class';
import { guestsDataSearch } from 'Main/assets/scripts/my-data';
import DropdownGuests from 'Components/dropdown/_type_guests/dropdown_type_guests';

applyClass('.js-calendar', Calendar);
applyClass([{ id: 'dropdown_guests_search', data: guestsDataSearch }], DropdownGuests);
