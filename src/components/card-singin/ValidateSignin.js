require("jquery-validation");
require("Scripts/ValidationMethods.js");

$(".card-signin").validate({
  rules: {
    email: {
      required: true,
      email: true,
      minlength: 7,
    },
    password: {
      required: true,
      pwcheck: true,
      lowerCase: true,
      upperCase: true,
      hasDigit: true,
      minlength: 8,
    }
  },
  messages: {
    email: {
      required: "Введите email",
      email: "Некорректный email",
      minlength: "Поле должно быть длинее 7 символов",
    },
    password: {
      required: "Введите пароль",
      pwcheck: "Содержит недопустимые значения",
      lowerCase: "Пароль должен содержать хотя бы 1 строчную букву",
      upperCase: "Пароль должен содержать хотя бы 1 заглавную букву",
      hasDigit: "Пароль должен содержать хотя бы 1 цифру",
      minlength: "Пароль должен быть длинее 8 символов",
    }
  },
  submitHandler: function(form) {                
    form.submit();
  },
  errorPlacement: function(error, element) {                 
    element.parent().after(error);
  }
})