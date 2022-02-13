function validateUsernameCreation(username) {
    const user = {
        username: username
    }
    $.get("/usernameAvailable", user, function(usernameIsAvailable) {
        const regexUsername = /^[0-9a-zA-Z ._\\-]{5,20}$/;
        const ok = regexUsername.test(username);
        let result;
        let color;
        if (!ok) {
            color = 'red';
            if (username.length < 5) {
                result = 'Username is too short. Must be between 5 and 20 characters';
            } else if (username.length > 20) {
                result = 'Username is too long. Must be between 5 and 20 characters';
            } else {
                result = 'Username can only contain letters [a-z / A-Z], numbers [0-9], spaces and certain special characters [. _ -]';
            }
        } else if (!usernameIsAvailable) {
             wdd
            color = 'red';
            result = 'Username is already taken';
        } else {
            color = 'green';
            result = '&#10003;';
        }
        $('#username-creation-validation-span').css('color', color);
        $('#username-creation-validation-span').html(result);
        console.log(ok);
        return ok;
    });
}

function validatePasswordCreation(password) {
    const regexPassword = /^[0-9a-zA-Z._\\-]{5,30}$/;
    const ok = regexPassword.test(password);
    let result;
    let color;
    if (!ok) {
        color = 'red';
        if (password.length < 5) {
            result = 'Password is too short. Must be between 5 and 30 characters';
        } else if (password.length > 30) {
            result = 'Password is too long. Must be between 5 and 30 characters';
        } else {
            result = 'Password can only contain letters [a-z / A-Z], numbers [0-9], and certain special characters [. _ -]';
        }
    } else {
        color = 'green';
        result = '&#10003;';
    }
    $('#password-creation-validation-span').css('color', color);
    $('#password-creation-validation-span').html(result);
    return ok;
}

function validateAccountCreation() {
    const username = $('#username-input-createAccount').val();
    const password = $('#password-input-createAccount').val();
    const usernameOK = validateUsernameCreation(username);
    const passwordOK = validatePasswordCreation(password);
    console.log(usernameOK, passwordOK);
    if (usernameOK && passwordOK) {
        return true;
    }
    return false;
}

function createAccount() {
    if (validateAccountCreation()) {
        const user = {
            username: $('#username-input-createAccount').val(),
            password: $('#password-input-createAccount').val()
        }
        $.post("/createAccount", user, function () {
            if ($('#auto-login-checkbox').is(':checked')) {
                $.get("/login", user, function (loginSuccess) {
                    if (loginSuccess) {
                        window.location.href = "/";
                    }
                    else {
                        alert('Could not log in, try doing so from the home page instead');
                    }
                }).fail(function () {
                    alert('Could not log in due to server issue, please try logging in from the home page instead');
                });
            } else {
                window.location.href = '/';
            }
        }).fail(function (status) {
            if (status.status == 422) {
                alert('Could not create account due to error in database, please try again later');
            } else if (status.status == 406) {
                alert('Validation error due to error in database, please try again later');
            } else {
                alert('Unknown error in database, please try again later');
            }
        });
    }
}