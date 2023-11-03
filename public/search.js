document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    searchButton.addEventListener("click", () => {
        const wordToSearch = searchInput.value;

        // Send a GET fetch request to retrieve the word from the database
        fetch(`http://localhost:3000/api/v1/definition/${wordToSearch}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Display the search results on the page
                searchResults.innerHTML = `Definition: ${data.definition}`;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                searchResults.innerHTML = "Error: Unable to retrieve the definition.";
            });
    });
});