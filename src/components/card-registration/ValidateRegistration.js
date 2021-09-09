require('jquery-validation');
require('Scripts/ValidationMethods');

$('.js-card-registration').validate({
  rules: {
    name: {
      required: true,
      minlength: 2,
    },
    surname: {
      required: true,
      minlength: 2,
    },
    birthday: {
      required: true,
    },
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
    },
  },
  messages: {
    name: {
      required: 'Введите Имя',
      minlength: 'Имя должно быть длинее 2 символов',
    },
    surname: {
      required: 'Введите Фамилию',
      minlength: 'Фамилия должна быть длинее 2 символов',
    },
    birthday: {
      required: 'Введите дату рождения',
    },
    email: {
      required: 'Введите email',
      email: 'Некорректный email',
      minlength: 'Поле должно быть длинее 7 символов',
    },
    password: {
      required: 'Введите пароль',
      pwcheck: 'Содержит недопустимые значения',
      lowerCase: 'Пароль должен содержать хотя бы 1 строчную букву',
      upperCase: 'Пароль должен содержать хотя бы 1 заглавную букву',
      hasDigit: 'Пароль должен содержать хотя бы 1 цифру',
      minlength: 'Пароль должен быть длинее 8 символов',
    },
  },
  submitHandler(form) {
    form.submit();
  },
  errorPlacement(error, element) {
    element.parent().after(error);
  },
});
