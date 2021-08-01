
import "./room-details.scss"
import likeButtons from "Main/components/button-like/buttonLike"

window.onload = function () {
    require("Main/components/checkbox-expandable/checkboxExpandable");
    require("Components/card_booking/card_booking");
    let likeButton_1 = new likeButtons("likes_author_1", 12);
    let likeButton_2 = new likeButtons("likes_author_2", 2);
}