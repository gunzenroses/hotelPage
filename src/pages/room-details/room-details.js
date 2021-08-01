
import "./room-details.scss"
import ButtonLike from "Main/components/button-like/buttonLike"
import ExpandItems from "Main/components/checkbox-expandable/expandItems"


window.onload = function () {
    require("Main/components/card-booking/cardBooking");
    let likeButton_1 = new ButtonLike("likes_author_1", 12);
    let likeButton_2 = new ButtonLike("likes_author_2", 2);
    let activateExpand = new ExpandItems();
}