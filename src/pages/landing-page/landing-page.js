import 'Main/assets/scripts/input-masks';
import 'Main/components/card-search/card-search';
import 'Main/components/footer/footer';
import applyClass from 'Main/assets/scripts/apply-class';
import ExpandItems from 'Main/assets/scripts/expand-items';

import './landing-page.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', ExpandItems);
};
