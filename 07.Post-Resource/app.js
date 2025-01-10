(function postResource() {

    const url = "https://jsonplaceholder.typicode.com/posts";
    const titleElement = document.getElementById('title-input');
    const descriptionBodyElement = document.getElementById('body-input');
    const buttonElement = document.getElementById('submit-post');
    const resultElement = document.getElementById('post-result');

    buttonElement.addEventListener('click', onSubmit);



    function onSubmit(e) {
        e.preventDefault();

        const data = {
            title: titleElement.value,
            description: descriptionBodyElement.value,
        };

        fetch(`${url}` , {
            method: 'POST',
            headers: {'Content-type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                const ulElement = document.createElement('ul');
                resultElement.appendChild(ulElement);

                ulElement.innerHTML += `<li><h4>${data.title}</h4>
                                            <p>${data.description}</p>
                                        </li>`;
            })
        titleElement.value = '';
        descriptionBodyElement.value = '';
    }



})()