$(() => {
    showPosts();
})


function showPosts() {
    $.get("getPosts", function (postsArray) {
        let out = '<h1>Posts</h1>';
        for (let post of postsArray) {
            out +=
                `<div>` +
                    `<div>${post.title}</div>` +
                    `<div>${post.content}</div>` +
                `</div>`;
        }
        $('#posts-div').append(out);
    });
}