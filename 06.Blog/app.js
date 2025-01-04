function attachEvents() {

    const postsUrl = "http://localhost:3030/jsonstore/blog/posts";
    const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";
    const buttonPosts = document.getElementById("btnLoadPosts");
    const selectPosts = document.getElementById("posts");
    selectPosts.innerHTML = "";

    buttonPosts.addEventListener('click', getPosts);

    function getPosts (e) {
        e.preventDefault();

        fetch(`${postsUrl}`)
        .then(response => response.json())
        .then(data => {
            const postsData = Object.values(data);
            postsData.forEach((post) => {
                selectPosts.innerHTML += `<option>${post.title}</option>`;
            })
        })


    }
}

attachEvents();