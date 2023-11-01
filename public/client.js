// public/client.js

const form = document.getElementById('dictionaryForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    const wordLanguage = document.getElementById('wordLanguage').value;
    const definitionLanguage = document.getElementById('definitionLanguage').value;

    // Send a POST request to your Server2 API to create a new entry
    // Handle the response and display it to the user
});