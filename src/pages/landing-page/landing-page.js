import 'Scripts/inputmasks';
import applyClass from 'Scripts/applyClass';
import Expand from 'Main/components/expand/Expand';
import 'Components/card-search/card-search';
import 'Components/footer/footer';

import './landing-page.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', Expand);
};
