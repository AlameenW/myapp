const express = require('express');
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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


// Post
app.post('/tasks',(req, res) => {
    req_task = req.body
    if (!req_task.title){
        return res.status(404).send({error: 'Task name missing'});
    }
    if (typeof(req_task.done) != Boolean){
        return res.status(404).send({error: 'Add a valid task status'})
    }
    const new_id = tasks[tasks.length-1].id + 1
    const new_task = {
        id: new_id,
        task: req_task.title,
        done: 'false'
    }
    tasks.push(new_task)
    res.status(200).send({message: 'Task added successfully'})
})

// Update
app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    const cur_task = tasks.find(task => task.id == id)
    if (!cur_task){
        return res.status(404).json({error: 'Task does not exist'})
    }
    if (!updates.title){
        return res.status(404).json({error: 'Title is empty'})
    }

    cur_task.title = updates.title
    return res.status(200).json({message: 'Task updated successfully', task: cur_task})
})
// Delete
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const del_index = tasks.findIndex(task => task.id == id);
    if (del_index == -1)
        return res.status(404).json({ error: "Tasks does not exist" });
    const [deleted] = tasks.splice(del_index,1);
    res.status(200).json({message: 'task deleted successfully', task: deleted});
})
app.listen(port, () => {
    console.log(`Example app testing on port ${port}`)
    console.log(`View here: http://localhost:3000/`);
});