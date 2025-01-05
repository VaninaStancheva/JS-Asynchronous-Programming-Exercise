function attachEvents() {

    const postsUrl = "http://localhost:3030/jsonstore/blog/posts";
    const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";
    const buttonPosts = document.getElementById("btnLoadPosts");
    const selectPosts = document.getElementById("posts");
    const postDetailsElement = document.getElementById("post-body");
    const viewButton = document.getElementById("btnViewPost");
    const commentsElement = document.getElementById("post-comments");
    let currentSelectedBlogId = '';
    selectPosts.innerHTML = "";

    buttonPosts.addEventListener('click', getPosts);
    viewButton.addEventListener('click', getPostDetails);
    selectPosts.addEventListener('change', getPost);

    function getPosts (e) {
        e.preventDefault();

        fetch(`${postsUrl}`)
            .then(response => response.json())
            .then(data => {
                const postsData = Object.values(data);
                currentSelectedBlogId = postsData[0].id;
                postsData.forEach((post) => {
                    selectPosts.innerHTML += `<option id="${post.id}" value="${post.id}">${post.title}</option>`;
                })
            })
    }

    function getPost(e) {
        currentSelectedBlogId = e.target.value;
    }

    function getPostDetails (e) {
        e.preventDefault();
        fetch(`${postsUrl}/${currentSelectedBlogId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                postDetailsElement.innerHTML = `${data.body}`;
            })

        fetch(`${commentsUrl}`)
        .then(response => response.json())
        .then(data => {
            const commentsData = Object.values(data);
            const currentPostComments = commentsData.filter(comment => comment.postId === currentSelectedBlogId);
            commentsElement.innerHTML = "";

            currentPostComments.forEach(com => {
                commentsElement.innerHTML += `<li>${com.text}</li>`;
            })
            console.log(currentPostComments);
        })
    }

}

attachEvents();