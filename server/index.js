const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const Todo = require('./models/Todo');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//DB Connect
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(error => console.error('DB connected error:', error));

//API 
app.post('/todos', async (req, res) => {
    const todo = new Todo({
        task: req.body.task
    });
    await todo.save();
    res.json(todo)
});

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.get('/todos/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.json(todo)
})

app.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id,
        { completed: req.body.completed },
        { new: true }
    );
    res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted succesfully' });
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))