$.validator.addMethod("pwcheck", function(value) {
  return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value); // consists of only these
});

$.validator.addMethod("lowerCase", function(value) {
  return /[a-z]{1,}/.test(value); // has a lowercase letter
});

$.validator.addMethod("upperCase", function(value) {
  return /[A-Z]{1,}/.test(value); // has an uppercase letter
});

$.validator.addMethod("hasDigit", function(value) {
  return /\d{1,}/.test(value); // has a digit
});