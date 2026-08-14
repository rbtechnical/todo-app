const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://mongo:27017/tododb');

const Todo = mongoose.model('Todo', { text: String, done: Boolean });

app.get('/todos', async (req, res) => res.json(await Todo.find()));
app.post('/todos', async (req, res) => {
  const todo = await Todo.create({ text: req.body.text, done: false });
  res.json(todo);
});
app.listen(3000, () => console.log('Todo API running via CI/CD pipeline'));