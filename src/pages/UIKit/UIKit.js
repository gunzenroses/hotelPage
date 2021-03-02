import "./UIkit.scss"
import "./UIKit.pug"

window.onload = function () {
    require("../../components/textField/datasetHandler");
    require("../../components/checkboxExpandable/checkboxExpandable");
    require("../../components/carousel/carousel");

    if (document.getElementById("dataRange_2")){
        require("../../components/buttonLike/buttonLike");
        require("../../components/range/range");
        require("../../components/pagination/pagination");
        require("../../components/dropdowns/dropdowns");
        require("../../components/calendar/calendar");
        require("../../components/card__search/search");
        require("../../components/card__booking/booking");
    }
}