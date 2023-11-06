document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.getElementById("deleteButton");
  const deleteInput = document.getElementById("deleteInput");
  const deleteResponse = document.getElementById("deleteResponse");
  const messages = require('../messages.json');


  deleteButton.addEventListener("click", async () => {
      const wordToDelete = deleteInput.value.trim();
      if (!wordToDelete) {
          deleteResponse.innerHTML = messages.MESSAGE_ENTER_WORD;
          return;
      }

      try {
          // Check if the word exists before attempting to delete
          const checkUrl = `http://localhost:3000/api/v1/definition/${encodeURIComponent(wordToDelete)}`;
          const checkResponse = await fetch(checkUrl, {
              method: "GET",
              headers: {
                  'Accept': 'application/json'
              }
          });

          if (!checkResponse.ok) {
              if (checkResponse.status === 404) {
                  deleteResponse.innerHTML = messages.MESSAGE_WORD_DOES_NOT_EXIST;
              } else {
                  throw new Error(`HTTP status ${checkResponse.status}`);
              }
              return;
          }

          const checkData = await checkResponse.json();
          console.log("Check word exists response:", checkData); // Log the response data

          // If there is no word property, log this fact and return.
          if (!checkData.word) {
              console.error("Word property is missing in response:", checkData);
              deleteResponse.innerHTML = messages.MESSAGE_WORD_DOES_NOT_EXIST;
              return;
          }

          // Word exists, proceed to delete
          const deleteResponseResult = await fetch(checkUrl, {
              method: "DELETE",
              headers: {
                  'Accept': 'application/json'
              }
          });

          if (deleteResponseResult.status === 204) {
              deleteResponse.innerHTML = `Word "${wordToDelete}" deleted successfully.`;
          } else {
              const deleteData = await deleteResponseResult.json();
              deleteResponse.innerHTML = deleteData.message || messages.MESSAGE_ERROR_OCCURRED;
          }
      } catch (error) {
          console.error("Error during the delete operation:", error);
          deleteResponse.innerHTML = `Error: ${error.message}`;
      }
  });
});
