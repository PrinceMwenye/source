document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    searchButton.addEventListener("click", () => {
        const wordToSearch = searchInput.value;

        fetch(`https://serversidelab6-55921ff3f339.herokuapp.com/api/v1/definition/${wordToSearch}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                return Promise.all([response.status, response.json()]);
            })
            .then(([status, data]) => {
                searchResults.innerHTML = `Status Codee: ${status}<br><br>Response:<pre>${JSON.stringify(data, null, 2)}</pre>`;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                searchResults.innerHTML = "Error: Unable to retrieve the definition.";
            });
    });
});