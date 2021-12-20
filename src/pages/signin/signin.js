import applyClass from 'Main/assets/scripts/applyClass';
import 'Main/assets/scripts/inputmasks';
import Expand from 'Main/components/expand/Expand';
import 'Components/footer/footer';
import 'Components/card-singin/card-signin';

import './signin.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', Expand);
};
