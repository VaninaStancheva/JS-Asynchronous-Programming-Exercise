(function chaining () {

    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
    const postDiv = document.getElementById('posts-list');
    const commentsDiv = document.getElementById('comments-list');

    (function drawPosts() {
        fetch(`${postsUrl}`)
        .then(res => res.json())
        .then(dataPosts => {
            const olElement = document.createElement('ol');
            postDiv.appendChild(olElement);

            dataPosts.forEach(dataPost => {
                olElement.id = `posts-${dataPost.id}`;
                const liElement = document.createElement('li');
                const titleElement = document.createElement('h4');
                const paragraphElement = document.createElement('p');
                const btnComElement = document.createElement('button');

                titleElement.innerText = dataPost.title;
                paragraphElement.innerText = dataPost.body;
                btnComElement.innerText = 'Show comments';
                btnComElement.id = dataPost.id;

                olElement.appendChild(liElement);
                liElement.appendChild(titleElement);
                liElement.appendChild(paragraphElement);
                liElement.appendChild(btnComElement);

                const showButton = document.getElementById(`${dataPost.id}`);
                showButton.addEventListener('click', getComments)
            })
        })
    })()

    function getComments(e) {
        e.preventDefault();
        const id = Number(e.currentTarget.id);
        commentsDiv.innerHTML = '';

        fetch(`${commentsUrl}`)
            .then(res => res.json())
            .then(dataComments => {

                const ulElement = document.createElement('ul');
                commentsDiv.appendChild(ulElement);

                const currentPostComments = dataComments.filter(comment => comment.postId === id);

                currentPostComments.forEach(currentPostComment => {
                    const comLiElement = document.createElement('li');
                    const nameElement = document.createElement('h5');
                    const paragraphElement = document.createElement('p');

                    nameElement.innerText = `name: ${currentPostComment.name}, email: ${currentPostComment.email}`;
                    paragraphElement.innerText = currentPostComment.body;

                    ulElement.appendChild(comLiElement);
                    comLiElement.appendChild(nameElement);
                    comLiElement.appendChild(paragraphElement);
                })
            })
    }
})()