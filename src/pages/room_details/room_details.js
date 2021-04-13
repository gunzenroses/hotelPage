
import "./room_details.scss"
import { likeButtons } from "../../components/buttonLike/buttonLike"

window.onload = function () {
    require("../../components/checkboxExpandable/checkboxExpandable");
    require("../../components/card__booking/booking");
    let likeButton_1 = new likeButtons("likes_author_1", 12);
    let likeButton_2 = new likeButtons("likes_author_2", 2);
}