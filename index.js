const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Example app testing on port ${port}`)
    console.log(`View here: http://localhost:3000/`);
});