import applyClass from 'Main/assets/scripts/applyClass';
import 'Main/assets/scripts/inputmasks';
import ButtonLike from 'Main/components/button-like/ButtonLike';
import 'Components/card-booking/card-booking';
import Expand from 'Main/components/expand/Expand';
import 'Components/footer/footer';

import './room-details.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', Expand);
  applyClass([
    { id: 'likes_author_1', data: 12 },
    { id: 'likes_author_2', data: 2 },
  ], ButtonLike);
};
