import applyClass from 'Scripts/apply-class';
import 'Scripts/input-masks';
import 'Components/card-registration/card-registration';
import Expand from 'Main/components/expand/expand';
import 'Components/footer/footer';

import './registration.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', Expand);
};
