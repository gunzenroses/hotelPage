import 'Scripts/inputmasks';
import applyClass from 'Scripts/applyClass';
import ButtonLike from 'Components/button-like/ButtonLike';
import 'Components/card-booking/card-booking';
import Expand from 'Main/components/expand/Expand';
import 'Components/footer/footer';

import './room-details.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', Expand);
  applyClass('.js-button-like', ButtonLike);
};
