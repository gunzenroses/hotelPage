import ExpandItems from "Components/checkbox-expandable/expandItems";

import "./landing-page.scss";

window.onload = function () {
  require("Components/footer/validate-footer-form");
  require("Components/card-search/cardSearch");
  require("Scripts/inputMasks");
  let activateExpand = new ExpandItems();
}