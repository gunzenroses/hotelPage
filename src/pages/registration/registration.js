import applyClass from 'Main/assets/scripts/applyClass';
import 'Main/assets/scripts/inputmasks';
import 'Components/card-registration/card-registration';
import Expand from 'Main/components/expand/Expand';
import 'Components/footer/footer';

import './registration.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', Expand);
};
