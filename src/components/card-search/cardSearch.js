// this exemplar will work for all pages
import Calendar from 'Main/components/calendar/Calendar';
import DropdownGuests from 'Main/components/dropdown-guests/DropdownGuests';
import guestsDataSearch from 'Main/assets/scripts/MyData';

window.onload = () => {
  console.log(5);
  new DropdownGuests('dropdown_guests_search', guestsDataSearch);
  new Calendar('calendar_search');
};
