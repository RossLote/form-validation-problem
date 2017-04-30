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

    function runValidator(event) {
        var errors = true;
        if (errors) {
            event.preventDefault();
            return false;
        }
        return true;
    }

    for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', runValidator, false);
    }
}()
