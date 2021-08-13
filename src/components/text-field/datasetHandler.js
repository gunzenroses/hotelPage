import maskDate from 'Main/components/text-field/datasetMaskDate'
import dataValidation from 'Main/components/text-field/datasetValidation'

const inputToValidate = document.querySelectorAll('input[data-rule]');

if (inputToValidate) {
  for (let inputField of inputToValidate) {
    let rule = inputField.dataset.rule;
    if (rule == "birthday") {
      maskDate(inputField);
    }
    dataValidation(inputField);
  }
}