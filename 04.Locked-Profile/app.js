function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const mainElement = document.getElementById('main');
    const metaData = [
        {
            labelName: 'Lock',
            type: 'radio',
            name: 'userLocked',
            value: 'lock',
            checked: 'checked',
        },
        {
            labelName: 'Unlock',
            type: 'radio',
            name: 'userLocked',
            value: 'unlock',
        },
        {
            labelName: 'Username',
            type: 'text',
            name: 'username',
            value: '',
            isDisabled: true,
            isReadOnly: true,
        },
        {
            labelName: 'Email',
            type: 'email',
            name: 'userEmail',
            value: '',
            isDisabled: true,
            isReadOnly: true,
        },
        {
            labelName: 'Age',
            type: 'text',
            name: 'userAge',
            value: '',
            isDisabled: true,
            isReadOnly: true,
        }]

    function creatProfileCards () {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const profilesData = Object.values(data);
                profilesData.forEach((profile) => {
                    let cardContainer = document.createElement('div');
                    cardContainer.setAttribute('id', `${profile._id}`);
                    cardContainer.setAttribute('class', 'profile');

                    let img = document.createElement('img');
                    img.setAttribute('src', './iconProfile2.png');
                    img.setAttribute('alt', 'userIcon');
                    img.setAttribute('class', 'userIcon');
                    mainElement.appendChild(cardContainer);
                    cardContainer.appendChild(img);

                    metaData.forEach((meta) => {
                        let labelEl = document.createElement('div');
                        labelEl.innerText = meta.labelName;
                        let inputEl = document.createElement('input');
                        inputEl.setAttribute('type', `${meta.type}`);
                        inputEl.setAttribute('name', `${meta.name}${profile._id}`);
                        inputEl.setAttribute('value', `${meta.value}`);
                        if (inputEl.type === 'radio' && inputEl.value === 'lock') {
                            inputEl.checked = true;
                        }
                        if (inputEl.type === 'text' || inputEl.type === 'email') {
                            inputEl.disabled = true;
                            inputEl.readOnly = true;
                        }
                        cardContainer.appendChild(labelEl);
                        cardContainer.appendChild(inputEl);
                    })

                    let showBtn = document.createElement('button');
                    showBtn.setAttribute('id', `show${profile._id}`);
                    showBtn.innerText = 'Show more'
                    cardContainer.appendChild(showBtn);

                    const showBtnElement = document.getElementById(`show${profile._id}`);
                    showBtnElement.addEventListener('click', onShowBtnClicked);


                })
            })

    }
    creatProfileCards ()
}

function onShowBtnClicked (e) {
    e.preventDefault();
    console.log('clicked')
}
