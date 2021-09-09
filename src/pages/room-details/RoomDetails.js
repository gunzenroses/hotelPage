import 'Scripts/InputMasks';
import 'Components/footer/ValidateFooterForm';
import 'Components/card-booking/CardBooking';
import makeExpandable from 'Components/checkbox-expandable/makeExpandable';
import makeButtonLike from 'Components/button-like/makeButtonLike';

import './room-details.scss';

window.onload = () => {
  makeExpandable();
  makeButtonLike([
    { id: 'likes_author_1', data: 12 },
    { id: 'likes_author_2', data: 2 },
  ]);
};
