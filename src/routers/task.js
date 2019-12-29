const express = require('express');
const Task = require('../models/task');
const router = express.Router();

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (!tasks) {
      return res.status(404).send();
    }
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send();
  }
});

router.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send('Task Not Found');
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const key = Object.keys(req.body);
  const allowedToUpdate = ['description', 'completed'];

  const isvalidUpdation = key.every(value => {
    return allowedToUpdate.includes(value);
  });

  if (!isvalidUpdation) {
    return res.status(400).send('Invalid update');
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!task) {
      return res.status(404).send('No Task Found');
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
