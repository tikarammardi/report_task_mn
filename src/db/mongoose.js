const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tk-mg-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
