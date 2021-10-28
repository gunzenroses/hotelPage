import makeCalendar from 'Components/calendar/makeCalendar';
import makeGuestsOption from 'Components/dropdown/_type_guests/makeGuestsOption';
import { guestsDataBooking } from 'Main/assets/scripts/myData';

makeCalendar();
makeGuestsOption([{ id: 'dropdown_guests_booking', data: guestsDataBooking }]);
