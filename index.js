const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req, res) => {
    res.send('Hello World');
});
app.get('/tasks',(req, res) => {
    res.send({
        'name': 'Tasks API',
        'version': '1.0',
        'endpoints': ['/tasks'],
    })
})
app.get('/health', (req, res) => {
    res.send({
        'status': 'ok'
    })
})
app.listen(port, () => {
    console.log(`Example app testing on port ${port}`)
    console.log(`View here: http://localhost:3000/`);
});