let queryInput = document.getElementById('query-input')
let querySubmit = document.getElementById('query-submit')
let results = document.getElementById('results')
let content = document.getElementById('content')

const getQuery = () => {
    results.innerHTML = '';
    const queryString = queryInput.value;
    console.log(queryString);
    (async () => {
        const rawResponse = await fetch('/getrequest', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'queryString': queryString})
        });
        const data = await rawResponse.json();
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let newResult = document.createElement('div');
            newResult.className = 'results-li'
            newResult.innerHTML = `<div class="series">series: ${data[i].series_title}</div><div class="release">VHS title: ${data[i].release_title}</div><div class="year">release year: ${data[i].release_year}</div><div class="summary">summary: ${data[i].summary}</div><div>The current estimated value of this VHS is: $${data[i].price_value}</div>`
            results.appendChild(newResult)
        }
    })();
}

querySubmit.addEventListener('click', getQuery)