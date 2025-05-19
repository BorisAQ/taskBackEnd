const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require ('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
// Get hola
app.get("/", (req, res) => res.send("Express on Vercel"));

const TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: Date,
  finished: Boolean,
});

const Task = mongoose.model('Task', TaskSchema);

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});




// Create task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// Update task
app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Delete task
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});


mongoose.connect(process.env.SERVER
).then(() => {    
  app.listen(3002, ()=>console.log ('Server runnin on port 3002'));
})
.catch(err => {
  console.log(err);
});

module.exports = app;