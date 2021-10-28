import 'Main/assets/scripts/input-masks';
import 'Main/components/card-booking/card-booking';
import 'Main/components/footer/footer';
import applyClass from 'Main/assets/scripts/apply-class';
import ExpandItems from 'Main/assets/scripts/expand-items';

import './room-details.scss';
import ButtonLike from 'Main/components/button-like/button-like';

window.onload = () => {
  applyClass('.js-dropdown__detection', ExpandItems);
  applyClass([
    { id: 'likes_author_1', data: 12 },
    { id: 'likes_author_2', data: 2 },
  ], ButtonLike);
};
