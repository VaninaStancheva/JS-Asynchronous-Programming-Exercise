function getInfo() {

    const baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';
    const busStop = document.getElementById('stopId').value; //read input value
    const stopNameElement = document.getElementById('stopName');
    const timeTableElement = document.getElementById('buses');

        fetch(`${baseUrl}/${busStop}`) //request to server
            .then(response => response.json()) //parse data to JSON;
            .then(data => {
                stopNameElement.textContent = data.name;
                Object.entries(data.buses)
                    .forEach(([key, value]) => {
                        let tableElement = document.createElement('li');
                        tableElement.textContent = `Bus ${key} arrives in ${value} minutes`;
                        timeTableElement.appendChild(tableElement);
                    })
                console.log(data)
            }) //display data;
            .catch(error => console.log(error)) //catch error;
}