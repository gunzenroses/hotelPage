import "./index.scss"
import "./index.pug"

window.onload = function () {
    require("scripts/data");
    require("scripts/datasetHandler");
    require("scripts/buttonLike");
    require("scripts/range.js");
    // require("scripts/dropdownRooms");
    require("scripts/pagination");
};