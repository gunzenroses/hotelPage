import "./UIkit.scss"
import "./UIKit.pug"
import { renderCalendar } from "../../assets/scripts/myLibrary"


window.onload = function () {
    require("../../components/textField/datasetHandler");
    require("../../components/checkboxExpandable/checkboxExpandable");
    require("../../components/carousel/carousel");


    require("../../components/buttonLike/buttonLike");
    require("../../components/range/range");
    require("../../components/pagination/pagination");
    require("../../components/dropdowns/dropdowns");

    //for formElements
    let calendar_1 = new renderCalendar("calendar_1");
    let calendar_2 = new renderCalendar("calendar_2");

    // for cards
    require("../../components/card__search/search");
    require("../../components/card__booking/booking");
    require("../../components/calendar/calendar");
    
}