function createPost() {
    $.get("/isLoggedIn", function(isLoggedIn) {
        if (isLoggedIn) {
            if (validateTitleAndContent()) {
                const newPost = {
                    title: $('#title-input').val(),
                    content: $('#content-textarea').val()
                }

                $.post("/createPost", newPost, function () {
                    window.location.href = '/';
                }).fail(function (status) {
                    if (status.status == 422) {
                        alert('Error with database, could not create post');
                    } else {
                        alert('Validation error, please try again later.');
                    }
                });
            }
        } else {
            alert('You must be logged in in order to create a post');
        }
    });
    /*if (isLoggedIn()) {
        if (validateTitleAndContent()) {
            const newPost = {
                title: $('#title-input').val(),
                content: $('#content-textarea').val()
            }

            $.post("/createPost", newPost, function () {
                window.location.href = '/';
            }).fail(function (status) {
                if (status.status == 422) {
                    alert('Error with database, could not create post');
                } else {
                    alert('Validation error, please try again later.');
                }
            });
        }
    } else {
        alert('You must be logged in in order to create a post');
    }*/
}

/*function isLoggedIn() {
    let isLoggedIn;

    $.get("/isLoggedIn", function(result) {
        isLoggedIn = result;
    });

    console.log(isLoggedIn);
    return isLoggedIn;
}*/

function resetTitleAndContent() {
    $('#title-input').val('');
    $('#content-textarea').val('');
}