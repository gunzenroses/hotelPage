import 'Main/assets/scripts/input-masks';
import 'Main/components/footer/footer';
import 'Main/components/card-registration/card-registration';
import applyClass from 'Main/assets/scripts/apply-class';
import ExpandItems from 'Main/assets/scripts/expand-items';

import './registration.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', ExpandItems);
};
