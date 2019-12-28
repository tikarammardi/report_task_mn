const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});
app.get('/users', (req, res) => {
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  User.findById({ _id: id })
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }
      res.status(200).send(user);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch(error => {
      res.status(400).send(error.message);
    });
});

app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => {
      if (!tasks) {
        return res.status(404).send();
      }
      res.status(200).send(tasks);
    })
    .catch(error => {
      res.status(400).send();
    });
});

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;

  Task.findById(id)
    .then(task => {
      if (!task) {
        return res.status(404).send('Task Not Found');
      }
      res.status(200).send(task);
    })
    .catch(error => {
      res.status(500).send();
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listining on port ${port}`);
});
