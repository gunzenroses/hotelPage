// this exemplar will work for all pages
import makeCalendar from 'Components/calendar/makeCalendar';
import makeGuestsOption from 'Components/dropdown-guests/makeGuestsOption';
import { guestsDataSearch } from 'Scripts/MyData';

makeCalendar();
makeGuestsOption([{ id: 'dropdown_guests_search', data: guestsDataSearch }]);
