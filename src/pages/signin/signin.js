import applyClass from 'Scripts/apply-class';
import 'Scripts/input-masks';
import Expand from 'Main/components/expand/expand';
import 'Components/footer/footer';
import 'Components/card-singin/card-signin';

import './signin.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', Expand);
};
