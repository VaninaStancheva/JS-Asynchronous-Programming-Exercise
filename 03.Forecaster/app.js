function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/forecaster';
    const submitInputElement = document.getElementById('submit');
    const locationInputElement = document.getElementById('location');
    const forecastElement = document.getElementById('forecast');
    const currentElement = document.getElementById('current');
    const upcomingElement = document.getElementById('upcoming');

    submitInputElement.addEventListener('click', onSubmit);

    function getLocationData (locationName) {

        fetch(`${baseUrl}/locations`)
        .then(response => response.json())
        .then((locationsData) => {
            const location = locationsData.find(location => location.name === locationName);
            if (!location) {
                forecastElement.textContent = 'Please enter a location.';
                return;
            }
                    getInfoToday(location);
                    getInfoUpcomingDay(location);

        })
    }

    function getInfoToday(location) {
        fetch(`${baseUrl}/today/${location.code}`)
        .then(response => response.json())
        .then(todayData => {
            console.log(todayData);

            const div = document.createElement('div');
            div.className = 'forecasts';

            const conditionSpan = document.createElement('span');
            conditionSpan.className = 'condition symbol';
            conditionSpan.innerHTML = getWeatherSymbol(todayData.forecast.condition);

            const detailsSpan = document.createElement('span');
            detailsSpan.className = 'condition';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'forecast-data';
            nameSpan.innerHTML = todayData.name;

            const tempSpan = document.createElement('span');
            tempSpan.className = 'forecast-data';
            tempSpan.innerHTML = `${todayData.forecast.low}°/${todayData.forecast.high}°`;

            const conditionTextSpan = document.createElement('span');
            conditionTextSpan.className = 'forecast-data';
            conditionTextSpan.innerHTML = todayData.forecast.condition;

            detailsSpan.append(nameSpan, tempSpan, conditionTextSpan);
            div.append(conditionSpan, detailsSpan);
            currentElement.append(div);

        })
    }

    function getInfoUpcomingDay(location) {
        fetch(`${baseUrl}/upcoming/${location.code}`)
            .then(response => response.json())
            .then(upcomingData => {
                console.log(upcomingData);

                const div = document.createElement('div');
                div.className = 'forecast-info';

                upcomingData.forecast.forEach(day => {
                    const daySpan = document.createElement('span');
                    daySpan.className = 'upcoming';

                    const conditionSymbol = document.createElement('span');
                    conditionSymbol.className = 'symbol';
                    conditionSymbol.innerHTML = getWeatherSymbol(day.condition);

                    const tempSpan = document.createElement('span');
                    tempSpan.className = 'forecast-data';
                    tempSpan.innerHTML = `${day.low}°/${day.high}°`;

                    const conditionTextSpan = document.createElement('span');
                    conditionTextSpan.className = 'forecast-data';
                    conditionTextSpan.innerHTML = day.condition;

                    daySpan.append(conditionSymbol, tempSpan, conditionTextSpan);
                    div.append(daySpan);
                });

                upcomingElement.append(div);
            });

    }

    function getWeatherSymbol(condition) {
        const symbols = {
            'Sunny': '&#x2600',
            'Partly sunny': '&#x26C5',
            'Overcast': '&#x2601',
            'Rain': '&#x2614',
            'Snow': '&#176',
        };
        return symbols[condition] || '';
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