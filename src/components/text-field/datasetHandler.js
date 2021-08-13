import dataValidation from 'Main/components/text-field/datasetValidation'

const inputToValidate = document.querySelectorAll('input[data-rule]');

if (inputToValidate) {
  for (let inputField of inputToValidate) {
    dataValidation(inputField);
  }
}