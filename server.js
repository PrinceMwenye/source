
const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Choose a different port, e.g., 3001

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Client is running on port ${port}`);
});