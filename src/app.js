/* src/app.js */
// exemple - require("scripts/demo");

// $(document).ready(() => {
//   console.log("Ready!");

//   require("scripts/demo");
// });

// Styles
import "styles/_index.scss";
import "./views/index.pug";

window.onload = function () {
  require("scripts/data");
};
