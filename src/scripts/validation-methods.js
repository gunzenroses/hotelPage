window.onload = () => {
  $.validator.addMethod('pwcheck', (value) => /^[A-Za-z0-9\d=!\-@._*]*$/.test(value)); // consists of only these
  $.validator.addMethod('lowerCase', (value) => /[a-z]{1,}/.test(value)); // has a lowercase letter
  $.validator.addMethod('upperCase', (value) => /[A-Z]{1,}/.test(value)); // has an uppercase letter
  $.validator.addMethod('hasDigit', (value) => /\d{1,}/.test(value)); // has a digit
};
