import 'Scripts/InputMasks';
import 'Components/card-booking/CardBooking';
import 'Components/footer/ValidateFooterForm';
import makeButtonLike from 'Components/button-like/makeButtonLike';
import makeExpandable from 'Components/checkbox-expandable/makeExpandable';

import './room-details.scss';

window.onload = () => {
  makeExpandable();
  makeButtonLike([
    { id: 'likes_author_1', data: 12 },
    { id: 'likes_author_2', data: 2 },
  ]);
};
