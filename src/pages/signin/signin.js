import ExpandItems from 'Components/checkbox-expandable/ExpandItems';

import './signin.scss';

window.onload = function () {
  require('Components/footer/ValidateFooterForm');
  require('Components/card-singin/ValidateSignin');
  require('Scripts/InputMasks');
  const activateExpand = new ExpandItems();
};
