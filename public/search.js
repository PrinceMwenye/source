document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    searchButton.addEventListener("click", () => {
        const wordToSearch = searchInput.value;

        fetch(`http://localhost:3000/api/v1/definition/${wordToSearch}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                return Promise.all([response.status, response.json()]); 
            })
            .then(([status, data]) => {
                searchResults.innerHTML = `Status Code: ${status}<br><br>Response:<pre>${JSON.stringify(data, null, 2)}</pre>`;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                searchResults.innerHTML = "Error: Unable to retrieve the definition.";
            });
    });
});