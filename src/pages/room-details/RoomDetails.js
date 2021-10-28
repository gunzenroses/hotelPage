import 'Scripts/inputMasks';
import 'Components/card-booking/cardBooking';
import 'Main/components/footer/validateFooterForm';
import makeButtonLike from 'Components/button-like/makeButtonLike';
import makeExpandable from 'Main/assets/scripts/makeExpandable';

import './room-details.scss';

window.onload = () => {
  makeExpandable();
  makeButtonLike([
    { id: 'likes_author_1', data: 12 },
    { id: 'likes_author_2', data: 2 },
  ]);
};
