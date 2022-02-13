$(() => {
    getPostFromDB();
});

function getPostFromDB() {
    const id = window.location.search.substring(1);
    $.get("/getSpecificPost?"+id, function(Post) {
        $('#id-edit').val(Post.id);
        $('#title-edit').val(Post.title);
        $('#content-edit').val(Post.content);
    }).fail(function () {
        alert('Error with retrieving information from database, please try again later.');
    });
}

function editPost() {
    $.get("/isLoggedIn", function(isLoggedIn) {
        if (isLoggedIn) {
            if (validateTitleAndContent()) {
                const post = {
                    id: $('#id-edit').val(),
                    title: $('#title-edit').val(),
                    content: $('#content-edit').val()
                }
                $.post("/editPost", post, function() {
                    window.location.href = '/';
                }).fail(function (status) {
                    if (status.status == 422) {
                        alert('Error with sending edited information to database, please try again later.');
                    } else {
                        alert('Validation error, please try again later.');
                    }
                });
            }
        } else {
            alert('You must be logged in to edit a post');
        }
    });
}

function resetEdit() {
    getPostFromDB();
}

function clearEdit() {
    $('#title-edit').val('');
    $('#content-edit').val('');
}