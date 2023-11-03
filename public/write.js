// public/client.js

function createNewEntry(word, definition, wordLanguage, definitionLanguage) {
    const entryData = {
        word: word,
        definition: definition,
        wordLanguage: wordLanguage,
        definitionLanguage: definitionLanguage,
    };

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
            // Handle the response data here
            console.log('New entry created:', data);
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });
}

// Function to handle form submission
function handleFormSubmit(event) {
    console.log("about to submit")
    event.preventDefault();

    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    const wordLanguage = document.getElementById('wordLanguage').value;
    const definitionLanguage = document.getElementById('definitionLanguage').value;

    // Call createNewEntry with form data
    createNewEntry(word, definition, wordLanguage, definitionLanguage);
}

// Add an event listener to the form submission
const form = document.getElementById('dictionaryForm');
form.addEventListener('submit', handleFormSubmit);