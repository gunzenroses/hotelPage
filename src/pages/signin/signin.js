import ExpandItems from "Components/checkbox-expandable/expandItems";

import "./signin.scss";

window.onload = function(){
  require("Components/footer/validate-footer-form");
  require("Components/card-singin/validate-signin");
  require("Scripts/inputMasks");
  let activateExpand = new ExpandItems();
}