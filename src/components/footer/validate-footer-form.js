require("jquery-validation");
require("Scripts/validationMethods.js");

$(".footer__form").validate({
  rules: {
    email: {
      required: true,
      email: true,
      minlength: 7,
    },
  },
  messages: {
    email: {
      required: "Введите email",
      email: "Некорректный email",
      minlength: "Поле должно быть длинее 7 символов",
    },
  },
  submitHandler: function(form) {                
    form.submit();
  },
  errorPlacement: function(error, element) {                 
    element.parent().after(error);
  }
})