function login() {
    const user = {
        username: $('#login-username').val(),
        password: $('#login-password').val()
    }

    $.get("/login", user, function (loginSuccess) {
        if (loginSuccess) {
            window.location.href = "/";
        }
        else {
            alert('Wrong password or username');
        }
    }).fail(function () {
        alert('Server issue, please try again later.');
    });
}
