import makeCalendar from 'Components/calendar/makeCalendar';
import makeGuestsOption from 'Components/dropdown-guests/makeGuestsOption';
import { guestsDataBooking } from 'Scripts/MyData';

makeCalendar();
makeGuestsOption([{ id: 'dropdown_guests_booking', data: guestsDataBooking }]);
