function createNewEntry(word, definition, wordLanguage, definitionLanguage) {
    const entryData = {
        word: word,
        definition: definition,
        wordLanguage: wordLanguage,
        definitionLanguage: definitionLanguage,
    };

    fetch(`https://serversidelab6-55921ff3f339.herokuapp.com/api/v1/definition/${word}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return Promise.all([response.status, response.json()]); // Include the status code
        })
        .then(([status, data]) => {
            const userResponse = confirm(`The word "${word}" already exists. Do you want to update its definition?`);
            if (userResponse) {
                fetch(`https://serversidelab6-55921ff3f339.herokuapp.com/api/v1/definition/${word}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(entryData),
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw an Error(`HTTP error! Status: ${response.status}`);
                        }
                        return Promise.all([response.status, response.json()]); // Include the status code
                    })
                    .then(([status, data]) => {
                        displayResponse(status, data); // Pass status and data to the display function
                    })
                    .catch((error) => {
                        console.error('Fetch error:', error);
                    });
            }
        })
        .catch((error) => {
            fetch('https://serversidelab6-55921ff3f339.herokuapp.com/api/v1/definition', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(entryData),
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return Promise.all([response.status, response.json()]); // Include the status code
                })
                .then(([status, data]) => {
                    displayResponse(status, data); // Pass status and data to the display function
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        });
}

function displayResponse(status, data) {
    const responseDisplay = document.getElementById('responseDisplay');
    responseDisplay.innerHTML = `
      <p>Status Code: ${status}</p>
      <pre>${JSON.stringify(data, null, 2)}</pre>`;
}

function handleFormSubmit(event) {
    event.preventDefault();

    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    const wordLanguage = document.getElementById('wordLanguage').value;
    const definitionLanguage = document.getElementById('definitionLanguage').value;

    createNewEntry(word, definition, wordLanguage, definitionLanguage);
}

const form = document.getElementById('dictionaryForm');
form.addEventListener('submit', handleFormSubmit);