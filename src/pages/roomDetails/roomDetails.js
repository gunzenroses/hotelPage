
import "./roomDetails.scss"
import { likeButtons } from "../../components/buttonLike/buttonLike"

window.onload = function () {
    require("../../components/checkboxExpandable/checkboxExpandable");
    require("../../components/card_booking/card_booking");
    let likeButton_1 = new likeButtons("likes_author_1", 12);
    let likeButton_2 = new likeButtons("likes_author_2", 2);
}