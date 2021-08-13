import ButtonLike from "Components/button-like/buttonLike";
import ExpandItems from "Components/checkbox-expandable/expandItems";

import "./room-details.scss";

window.onload = function () {
    require("Components/card-booking/cardBooking");
    let likeButton_1 = new ButtonLike("likes_author_1", 12);
    let likeButton_2 = new ButtonLike("likes_author_2", 2);
    let activateExpand = new ExpandItems();
}