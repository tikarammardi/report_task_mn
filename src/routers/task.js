const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    _user: req.user._id
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/tasks', auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ _user: req.user._id });
    await req.user.populate('tasks').execPopulate();

    res.status(200).send(req.user.tasks);
  } catch (error) {
    res.status(400).send();
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, _user: req.user._id });
    if (!task) {
      return res.status(404).send('Task Not Found');
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedToUpdate = ['description', 'completed'];

  const isvalidUpdation = updates.every(value => {
    return allowedToUpdate.includes(value);
  });

  if (!isvalidUpdation) {
    return res.status(400).send('Invalid update');
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      _user: req.user._id
    });

    if (!task) {
      return res.status(404).send('No Task Found');
    }
    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      _user: req.user._id
    });
    if (!task) {
      return res.status(404).send('Task not found');
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
