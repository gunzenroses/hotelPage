require('jquery-validation');

class Validation {
  constructor(element) {
    this.init(element);
  }

  init(element) {
    this.addMethods();
    this.validate(element);
  }

  addMethods() {
    $.validator.addMethod('pwcheck', (value) =>
      /^[A-Za-z0-9\d=!\-@._*]*$/.test(value)
    );
    $.validator.addMethod('lowerCase', (value) => /[a-z]{1,}/.test(value));
    $.validator.addMethod('upperCase', (value) => /[A-Z]{1,}/.test(value));
    $.validator.addMethod('hasDigit', (value) => /\d{1,}/.test(value));
  }

  validate(element) {
    this.validator = $(element).validate({
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
        },
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
      },
      messages: {
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
      },
      errorPlacement(error, element) {
        element.parent().after(error);
      },
      submitHandler(form) {
        form.submit();
      },
    });
  }
} 

export default Validation;