function createNewEntry(word, definition, wordLanguage, definitionLanguage) {
    const entryData = {
        word: word,
        definition: definition,
        wordLanguage: wordLanguage,
        definitionLanguage: definitionLanguage,
    };

    fetch(`http://localhost:3000/api/v1/definition/${word}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const userResponse = confirm(`The word "${word}" already exists. Do you want to update its definition?`);
            if (userResponse) {
                fetch(`http://localhost:3000/api/v1/definition/${word}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(entryData),
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log('Definition updated:', data);
                    })
                    .catch((error) => {
                        console.error('Fetch error:', error);
                    });
            }
        })
        .catch((error) => {
            fetch('http://localhost:3000/api/v1/definition', {
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
                    return response.json();
                })
                .then((data) => {
                    console.log('New entry created:', data);
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        });
}


function handleFormSubmit(event) {
    console.log("about to submit")
    event.preventDefault();

    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    const wordLanguage = document.getElementById('wordLanguage').value;
    const definitionLanguage = document.getElementById('definitionLanguage').value;

    createNewEntry(word, definition, wordLanguage, definitionLanguage);
}

const form = document.getElementById('dictionaryForm');
form.addEventListener('submit', handleFormSubmit);