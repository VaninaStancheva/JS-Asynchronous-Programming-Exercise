function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/forecaster';
    const submitInputElement = document.getElementById('submit');
    const locationInputElement = document.getElementById('location');
    const forecastElement = document.getElementById('forecast');

    submitInputElement.addEventListener('click', onSubmit);

    function getLocationData (locationName) {

        fetch(`${baseUrl}/locations`)
        .then(response => response.json())
        .then((locationsData) => {
            console.log(locationsData);
            console.log(locationName);
            for (let locationData of locationsData) {
                if (locationName !== `${locationData.name}`) {
                    getInfoToday(locationData);
                    getInfoUpcomingDay(locationData);
                }
            }
        })
    }

    function getInfoToday(locationData) {
        fetch(`${baseUrl}/today/${locationData.code}`)
        .then(response => response.json())
        .then(todayData => {
            console.log(todayData);

        })
    }

    function getInfoUpcomingDay(locationData) {
        fetch(`${baseUrl}/upcoming/${locationData.code}`)
            .then(response => response.json())
            .then(upcomingData => {
                console.log(upcomingData);

            });

    }

    function onSubmit(e) {
        e.preventDefault();
        const locationName = locationInputElement.value;
        forecastElement.style.display = 'block';

        getLocationData(locationName)

        console.log('clicked')
    }


}

attachEvents();