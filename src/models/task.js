const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  _user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
