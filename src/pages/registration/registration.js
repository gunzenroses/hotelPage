import 'Scripts/inputmasks';
import applyClass from 'Scripts/applyClass';

import 'Components/card-registration/card-registration';
import Expand from 'Components/expand/Expand';
import 'Components/footer/footer';

import './registration.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', Expand);
};
