export default dataValitadion = function (elm) {
    elm.addEventListener('blur', function(e){
        let inputContainer = elm.parentNode;  // to get from input to its div container
        let rule = elm.name;
        let value = elm.value;
        let check;
        let message;
        switch(rule){
            case "date":
                check = /^(0[1-9]|[12][0-9]|3[01])[-/.](0[1-9]|1[012])[-/.](20)[2-9][0-9]$/.test(value);
                message = "Введите валидную дату";
            break;
            case "birthday":
                check = /^(0[1-9]|[12][0-9]|3[01])[-/.](0[1-9]|1[012])[-/.](20|19)[0-9][0-9]$/.test(value);
                message = "Введите валидную дату";
            break;
            case "email":
                check = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
                message = "Введите валидный email";
            break;
            case "password":
                check = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{3,}$/.test(value);
                message = "Введите валидный пароль";
            break;
        }
        if (!check && value!="") {
            inputContainer.nextElementSibling.textContent = message;
        }
        else {
            inputContainer.nextElementSibling.textContent = "";
        }
    })
}