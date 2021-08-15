import ButtonLike from "Components/button-like/ButtonLike";
import ExpandItems from "Components/checkbox-expandable/ExpandItems";

import "./room-details.scss";

window.onload = function () {
  require("Main/components/footer/ValidateFooterForm");
  require("Main/components/card-booking/CardBooking");
  require("Scripts/InputMasks");
  let likeButton_1 = new ButtonLike("likes_author_1", 12);
  let likeButton_2 = new ButtonLike("likes_author_2", 2);
  let activateExpand = new ExpandItems();
}