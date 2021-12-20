// this exemplar will work for all pages
import Calendar from 'Main/components/calendar/Calendar';
import applyClass from 'Main/assets/scripts/applyClass';
import { guestsDataSearch } from 'Main/assets/scripts/my-data';
import DropdownGuests from 'Main/components/dropdown/_type_guests/DropdownGuests';

applyClass('.js-calendar', Calendar);
applyClass([{ id: 'dropdown_guests_search', data: guestsDataSearch }], DropdownGuests);
