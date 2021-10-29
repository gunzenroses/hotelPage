import 'Scripts/input-masks';
import applyClass from 'Scripts/apply-class';
import Expand from 'Main/components/expand/expand';
import 'Components/card-search/card-search';
import 'Components/footer/footer';

import './landing-page.scss';

window.onload = () => {
  applyClass('.js-dropdown__detection', Expand);
};
