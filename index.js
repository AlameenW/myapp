const express = require('express');
const app = express();
const port = 3000;

const tasks = [
    {
        id: 1,
        title: 'task1',
        done: 'true'
    },
    {
        id: 2,
        title: 'task2',
        done: 'false'
    },
    {
        id: 3,
        title: 'task3',
        done: 'false'
    }
]
app.get('/',(req, res) => {
    res.send({
        'name': 'Tasks API',
        'version': '1.0',
        'endpoints': ['/tasks'],
    })
})
app.get('/tasks', (req, res) => {
    res.send(tasks)
})
app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.id == id)    
    if (!task){
        res.status(404).send({ error: `Task ${id} not found` });
        return;
    }
    res.status(200).send(task)
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