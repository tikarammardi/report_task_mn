const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listining on port ${port}`);
});

// const Task = require('./models/task');
// const User = require('./models/user');
// const main = async () => {
//   // const task = await Task.findById('5e08cb3dd63e8a16b465a999');
//   // await task.populate('_user').execPopulate();
//   // console.log(task._user);

//   const user = await User.findById('5e08ca7cfae4d009a0edb5ac');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);
// };
// main();
