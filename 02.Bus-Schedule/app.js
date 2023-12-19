function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/bus/schedule';
    const stopId = document.querySelector('#info span');
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    //The ID of the first stop is "depot"
    let stop = {
        next: 'depot',
    };

    function depart() {
        // get info for next stop
        // display next stop
        //enable arriveButton and disable departButton

        departButton.disabled = true;

        fetch(`${baseUrl}/${stop.next}`)
            .then(response => response.json())
            .then(data => {
                stop = data;
                stopId.textContent = `Next stop ${stop.name}`;
                console.log(data)
            })
        arriveButton.disabled = false;
    }

    function arrive() {
        // get info for current stop
        // display current stop
        //enable arriveButton or disable departButton (?)
        arriveButton.disabled = true;

        fetch(`${baseUrl}/${stop.next}`)
            .then(response => response.json())
            .then(data => {
                stop = data;
                stopId.textContent = `Arriving at ${stop.name}`;
                console.log(data)
            })

        departButton.disabled = false;

        console.log('Arrive TODO...');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();