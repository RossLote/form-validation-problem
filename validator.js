!function(){
    var forms = document.getElementsByClassName('js-validator');
    var errorClass = 'error';

    function addError(el) {
        var className = el.className.trim();
        if (el.className.indexOf(errorClass) === -1) {
            el.className = className + ' ' + errorClass;
        }
    }

    function removeError(el) {
        var regex = '(?:^|\\s)'+errorClass+'(?!\\S)';
        el.className = el.className.replace(new RegExp(regex, 'g'), '');
    }


    function validateElement(validationFuncton, el) {
        var valid = !validationFuncton(el);
        if (el instanceof RadioNodeList) {
            el = el[0];
        }
        if (valid) {
            addError(el.parentNode);
        } else {
            removeError(el.parentNode);
        }
        return valid;
    }

    function getCheckedCheckboxes(checkboxes) {
        var checked = []
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checked.push(checkboxes[i])
            }
        }
        return checked;
    }

    function emailValid(el) {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(el.value);
    }

    function passwordValid(el) {
        return el.value.length > 7;
    }

    function runValidator(event) {
        var elements = event.target.elements;
        var error = validateElement(emailValid, elements['email']) |
                    validateElement(passwordValid, elements['password']);
        if (error) {
            event.preventDefault();
            return false;
        }
        return true;
    }

    for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', runValidator, false);
    }
}()
