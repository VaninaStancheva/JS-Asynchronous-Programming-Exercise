(function chaining () {

    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
    const postDiv = document.getElementById('posts-list');
    const commentsDiv = document.getElementById('comments-list');

    (function drawPosts() {
        fetch(`${postsUrl}`)
        .then(res => res.json())
        .then(dataPosts => {
            console.log(dataPosts);

            const ulElement = document.createElement('ul');
            postDiv.appendChild(ulElement);

            dataPosts.forEach(dataPost => {
                ulElement.innerHTML += `<li><h4>${dataPost.title}</h4>
                                            <p>${dataPost.body}</p>
                                            <button id="${dataPost.id}">Show coments</button>
                                        </li>`;
                const showButton = document.getElementById(`${dataPost.id}`);
                showButton.addEventListener('click', getComments)
            })
        })
    })()

    function getComments(e) {
        e.preventDefault();
        fetch(`${commentsUrl}`)
            .then(res => res.json())
            .then(dataComments => {
                console.log(dataComments);


                const ulElement = document.createElement('ul');
                commentsDiv.appendChild(ulElement);

                dataComments.forEach(dataComment => {
                    if (e.currentTarget.id === dataComment.id) {
                        ulElement.innerHTML += `<li><h4>${dataComment.name}</h4>
                                            <p>${dataComment.body}</p>
                                        </li>`;
                    }
                })
            })
    }

})()