let maskDate = require('./datasetMaskDate')
let dataValitadion = require('./datasetValidation')

let inputToValidate = document.querySelectorAll('input[data-rule]');

if (inputToValidate) {
    for (let inputField of inputToValidate){
        let rule = inputField.dataset.rule;
        if (rule == "birthday"){
            maskDate(inputField);
        }
        dataValitadion(inputField);
    }
}






/*
    To validate the Date
*/
// function checkDate(year, month, day){
//     let date = new Date(year, month-1, day);
//     return (date.getFullYear == year
//         && date.getMonth == month
//         && date.getDate == day);
// }

/*

*/
// function validateForm(selector, rules){
//     new window.JustValitade(selector, {
//         rules: rules,
//         submitHandler: function(form, values, ajax){
//             console.log(form);
//         }
//     }
// }