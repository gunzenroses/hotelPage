import ExpandItems from "Components/checkbox-expandable/expandItems";

import "./registration.scss";

window.onload = function () {
  require("Components/footer/validate-footer-form");
  require("Components/card-registration/validate-registration");
  require("Scripts/inputMasks");
  let activateExpand = new ExpandItems();
}