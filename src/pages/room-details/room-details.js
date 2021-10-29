import applyClass from 'Scripts/apply-class';
import 'Scripts/input-masks';
import ButtonLike from 'Components/button-like/button-like';
import 'Components/card-booking/card-booking';
import Expand from 'Main/components/expand/expand';
import 'Components/footer/footer';

import './room-details.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', Expand);
  applyClass([
    { id: 'likes_author_1', data: 12 },
    { id: 'likes_author_2', data: 2 },
  ], ButtonLike);
};
