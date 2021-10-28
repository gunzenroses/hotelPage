import 'Main/assets/scripts/input-masks';
import 'Main/components/footer/footer';
import 'Main/components/card-singin/card-signin';
import ExpandItems from 'Main/assets/scripts/expand-items';
import applyClass from 'Main/assets/scripts/apply-class';

import './signin.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', ExpandItems);
};
