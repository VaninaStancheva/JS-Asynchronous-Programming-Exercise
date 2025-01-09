function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/forecaster';
    const submitInputElement = document.getElementById('submit');
    const locationInputElement = document.getElementById('location');

    submitInputElement.addEventListener('click', onSubmit);

    function getLocationData (locationName) {

        fetch(`${baseUrl}/locations`)
        .then(response => response.json())
        .then(locationsData => {

            for (let locationData of locationsData) {
                if (locationName === locationData.name) {
                    getInfoToday(locationData);
                    getInfoUpcomingDay(locationData);
                } else {
                    alert(`Could not find location: ${locationName}`);
                }
            }
        })
    }

    function getInfoToday(locationData) {
        fetch(`${baseUrl}/today/${locationData.code}`)
        .then(response => response.json())
        .then(data => {console.log(data)})
    }

    function getInfoUpcomingDay(locationData) {
        fetch(`${baseUrl}/upcoming/${locationData.code}`)
            .then(response => response.json())
            .then(data => {console.log(data)})

    }

    function onSubmit(e) {
        e.preventDefault();
        const locationName = locationInputElement.value;

        getLocationData(locationName)

        console.log('clicked')
    }


}

attachEvents();