
import "./roomDetails.scss"
import likeButtons from "Components/buttonLike/buttonLike"

window.onload = function () {
    require("Components/checkboxExpandable/checkboxExpandable");
    require("Components/card_booking/card_booking");
    let likeButton_1 = new likeButtons("likes_author_1", 12);
    let likeButton_2 = new likeButtons("likes_author_2", 2);
}