import 'Main/assets/scripts/inputmasks';
import applyClass from 'Main/assets/scripts/applyClass';
import Expand from 'Main/components/expand/Expand';
import 'Components/card-search/card-search';
import 'Components/footer/footer';

import './landing-page.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', Expand);
};
