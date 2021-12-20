import applyClass from 'Scripts/applyClass';
import 'Scripts/inputmasks';

import Expand from 'Components/expand/Expand';
import 'Components/card-singin/card-signin';
import 'Components/footer/footer';

import './signin.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', Expand);
};
