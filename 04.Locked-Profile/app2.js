(function() {
    const profileUrl = 'http://localhost:3030/jsonstore/advanced/profiles';
    const mainHtmlTag = document.getElementById('main');

    function getProfileData() {
        fetch(profileUrl)
            .then(response => response.json())
            .then(cardProfiles => {

                for (let card in cardProfiles) {
                    drawCard(cardProfiles[card]);
                }
            });
    }

    getProfileData();

    function drawCard(cardData) {
        const cardElement = document.createElement("div");
        cardElement.className = "profile";
        cardElement.id = cardData._id;

        mainHtmlTag.appendChild(cardElement);
        drawContent(cardElement, cardData);
        console.log(cardData);
    }

    function drawContent(cardElement, cardData) {
        drawImage(cardElement);
        drawForm(cardElement, cardData);
        drawButton(cardElement, cardData);
    }

    function drawForm(cardElement, cardData) {
        const radioButtons = [
            {
                value: 'locked',
                checked: true,
                innerText: 'Lock'
            },
            {
                value: 'unlocked',
                checked: false,
                innerText: 'Unlock'
            }
        ]
        const profileInfoForm = [
            {
                inputName: 'username',
                type: 'text',
                innerText: 'Username',
            },
            {
                inputName: 'email',
                type: 'email',
                innerText: 'Email',
            },
            {
                inputName: 'age',
                type: 'text',
                innerText: 'Age',
            }
        ]

        const profileInfoContainer = document.createElement('div');
        profileInfoContainer.id = `${cardData._id}-infoContainer`;
        profileInfoContainer.style.visibility = 'hidden';

        radioButtons.forEach(button => createRadioButton(button, cardElement, cardData));
        profileInfoForm.forEach(profileForm => createProfileInfoForm(profileForm, cardElement, cardData, profileInfoContainer));

        cardElement.appendChild(profileInfoContainer);
    }

    function drawImage(cardElement) {
        const imageElement = document.createElement("img");
        imageElement.src = './iconProfile2.png';
        imageElement.className = 'userIcon';
        cardElement.appendChild(imageElement);
    }

    function createRadioButton(buttonData, cardElement, cardData) {
        const radioButton = document.createElement('input');
        const radioButtonLabel = document.createElement('label');
        radioButton.type = 'radio';
        radioButton.name = `${cardData._id}`;
        radioButton.value = buttonData.value;
        radioButton.checked = buttonData.checked;
        radioButtonLabel.innerText = buttonData.innerText;

        radioButton.addEventListener('click', (e) => {
            toggleButton(e);
        })

        cardElement.appendChild(radioButtonLabel);
        cardElement.appendChild(radioButton);
    }

    function toggleButton(e) {
        const id = e.currentTarget.name;
        const buttonElement = document.getElementById(`${id}-showBtn`);
        buttonElement.disabled = !buttonElement.disabled;
        return buttonElement.disabled;
    }

    function createProfileInfoForm (profileFormData, cardElement, cardData, profileInfoContainer) {
        const profileInfoLabel = document.createElement('label');
        const profileInfoInput = document.createElement('input');
        profileInfoInput.id = `${cardData._id}-${profileFormData.inputName}`;
        profileInfoInput.type = profileFormData.type;
        profileInfoInput.name = `${cardData._id}-${profileFormData.inputName}`;
        profileInfoInput.disabled = true;
        profileInfoInput.readOnly = true;
        profileInfoLabel.innerText = profileFormData.innerText;

        if (profileInfoLabel.innerText === 'Email') {
            profileInfoContainer.appendChild(profileInfoLabel);
        } else if (profileInfoLabel.innerText === 'Age') {
            profileInfoContainer.appendChild(profileInfoLabel);
        } else {
            cardElement.appendChild(profileInfoLabel);
        }

        if (profileInfoInput.id === `${cardData._id}-email`) {
            profileInfoContainer.appendChild(profileInfoInput);
        } else if (profileInfoInput.id === `${cardData._id}-age`) {
            profileInfoContainer.appendChild(profileInfoInput);
        } else {
            cardElement.appendChild(profileInfoInput);
        }

        if (profileInfoInput.id === `${cardData._id}-username`) {
            profileInfoInput.value = `${cardData.username}`;
        } else if (profileInfoInput.id === `${cardData._id}-email`) {
            profileInfoInput.value = `${cardData.email}`;
        } else if (profileInfoInput.id === `${cardData._id}-age`) {
            profileInfoInput.value = `${cardData.age}`;
        }
    }

    function drawButton (cardElement, cardData) {
        const button = document.createElement('button');
        button.id = `${cardData._id}-showBtn`;
        button.innerText = 'Show more';
        button.disabled = true;

        button.addEventListener('click', (e) => {
            onShowClicked(e);
        })

        cardElement.appendChild(button);

    }

   function onShowClicked (e) {
        e.preventDefault();
        const buttonId = e.currentTarget.id.split('-');
        buttonId.pop();
        const id = buttonId.join('-');
        const cardInfoElement = document.getElementById(`${id}-infoContainer`);
        if(cardInfoElement.style.visibility === 'hidden') {
            e.currentTarget.innerText = 'Hide it';
            cardInfoElement.style.visibility = 'visible'
        } else if (cardInfoElement.style.visibility === 'visible') {
            e.currentTarget.innerText = 'Show more';
            cardInfoElement.style.visibility = 'hidden';
        }
    }
})()


