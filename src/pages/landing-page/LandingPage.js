import ExpandItems from 'Components/checkbox-expandable/ExpandItems';

import './landing-page.scss';

window.onload = function () {
  require('Main/components/footer/ValidateFooterForm');
  require('Main/components/card-search/CardSearch');
  require('Scripts/InputMasks');
  const activateExpand = new ExpandItems();
};
