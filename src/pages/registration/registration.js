import ExpandItems from "Components/checkbox-expandable/ExpandItems";

import "./registration.scss";

window.onload = function () {
  require("Main/components/footer/ValidateFooterForm");
  require("Main/components/card-registration/ValidateRegistration");
  require("Scripts/InputMasks");
  let activateExpand = new ExpandItems();
}