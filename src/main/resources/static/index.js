$(() => {
    $.get("/isLoggedIn", function(isLoggedIn) {
        if (isLoggedIn) {
            $('#login-btn').hide();
            $('#logout-btn').show();
        } else {
            $('#login-btn').show();
            $('#logout-btn').hide();
        }
    });
    showPosts();
});

function showPosts() {
    $.get("/getPosts", function (postsArray) {
        let out = '<h1>Posts</h1>';
        for (let post of postsArray) {
            out +=
                `<div>` +
                `<div>${post.title}</div>` +
                `<div>${post.content}</div>` +
                `<div><button class="btn btn-primary" onclick="sendToPost('edit', ${post.id})">Edit</button></div>` +
                `<div><button class="btn btn-danger" onclick="deleteThisPost(${post.id})">Delete</button></div>` +
                `</div>`;
        }
        $('#posts-div').html(out);
    }).fail(function () {
        alert('Could not retrieve posts from database, please try again later.');
    });
}

function logout() {
    $.post("/logout", function () {
        window.location.href = '/';
    });
}

function sendToPost(type, editId) {
    $.get("/isLoggedIn", function(isLoggedIn) {
        if (isLoggedIn) {
            if (type === 'create') {
                window.location.href = '/createPost.html';
            } else if (type === 'edit') {
                window.location.href = '/editPost.html?id=' + editId;
            }
        } else {
            alert('You must be logged in to ' + type + ' a post');
        }
    });
}

function deleteAllPosts() {
    $.get("/isLoggedIn", function(isLoggedIn) {
        if (isLoggedIn) {
            $.post("/deleteAllPosts", function () {
                showPosts();
            }).fail(function () {
                alert('Could not delete posts due to error in database, please try again later.');
            });
        } else {
            alert('You must be logged in to delete posts');
        }
    });
}

function deleteThisPost(id) {
    $.get("/isLoggedIn", function(isLoggedIn) {
        if (isLoggedIn) {
            $.post("/deleteThisPost?id="+id, function () {
                window.location.href = '/';
            }).fail(function () {
                alert('Could not delete post due to database error, please try again later');
            });
        } else {
            alert('You must be logged in to delete posts');
        }
    });
}

