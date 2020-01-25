require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('Uncaught Exception! Shutting down....');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connected successful'));
// .catch(() => console.log('DB connection failed!!!!!!!!!!!!!'));
// ошибку подключения обработает событие unhandledRejection

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection! Shutting down....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
