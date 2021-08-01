
import "./room-details.scss"
import ButtonLike from "Main/components/button-like/buttonLike"

window.onload = function () {
    require("Main/components/checkbox-expandable/checkboxExpandable");
    require("Main/components/card-booking/cardBooking");
    let likeButton_1 = new likeButtons("likes_author_1", 12);
    let likeButton_2 = new likeButtons("likes_author_2", 2);
}