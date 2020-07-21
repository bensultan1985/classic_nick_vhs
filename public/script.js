let queryInput = document.getElementById('query-input')
let querySubmit = document.getElementById('query-submit')
let results = document.getElementById('results')

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
        const content = await rawResponse.json();
        console.log(content);
        for (let i = 0; i < content.length; i++) {
            results.innerHTML = `<div>${content[i].id}<br>${content[i].series_title}<br>${content[i].release_title}</div>`
        }
    })();
}

querySubmit.addEventListener('click', getQuery)