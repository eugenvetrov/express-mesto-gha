const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/notFound');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));
app.use('/users', auth, require('./routes/users'));

app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Такой запрос не найден'));
});

const errorHandler = (err, req, res, next) => {
  res.status(err.code).send({ message: err.message });
  next();
};
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
