define(function(){
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

    function handleError(valid, el) {
        if (!valid) {
            addError(el.parentNode);
        } else {
            removeError(el.parentNode);
        }
    }

    function validateElement(validationFunction, element) {
        var valid = validationFunction.apply(null, Array.prototype.slice.call(arguments, 1));
        handleError(valid, element);
        return valid;
    }

    function validateElements(validationFunction, elements) {
        var valid = validationFunction.apply(null, Array.prototype.slice.call(arguments, 1));
        handleError(valid, elements[0]);
        return valid;
    }

    function getCheckedCheckboxes(checkboxes) {
        var checked = []
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checked.push(checkboxes[i]);
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

    function colourValid(el) {
        return !!el.value;
    }

    function animalValid(els) {
        var checked = getCheckedCheckboxes(els);
        return checked.length  > 1;
    }

    function tigerValid(el, animals) {
        var checked = getCheckedCheckboxes(animals);
        for (var i = 0; i < checked.length; i++) {
            if (checked[i].value === 'tiger') {
                return !!el.value;
            }
        }
        return true;
    }

    function runValidator(event) {
        var elements = event.target.elements;
        var valid = validateElement(emailValid, elements['email']) &
                    validateElement(passwordValid, elements['password']) &
                    validateElement(colourValid, elements['colour']) &
                    validateElements(animalValid, elements['animal']) &
                    validateElement(tigerValid, elements['tiger_type'], elements['animal']);

        if (!valid) {
            event.preventDefault();
            return false;
        }
        return true;
    }
    return runValidator;
});
