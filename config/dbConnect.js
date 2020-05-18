const mongoose = require('mongoose');

module.exports = () => {
  mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('MongoDB Connected');
    })
    .catch((err) => {
      console.log(`MONGODB ERROR ${err}`);
    });
};
