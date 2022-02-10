function createPost() {
    const newPost = {
        title: $('#title-input').val(),
        content: $('#content-textarea').val()
    }

    $.post("/createPost", newPost, function () {
        window.location.href = "/";
    });
}

function resetTitleAndContent() {
    $('#title-input').val("");
    $('#content-textarea').val("");
}