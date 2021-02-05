import "./index.scss"
import "./index.pug"

window.onload = function () {
    require("./components/textField/datasetHandler");
    require("./components/checkboxExpandable/checkboxExpandable");
    require("./components/carousel/carousel");
    
    require("./pages/UIKit/UIKit");
};