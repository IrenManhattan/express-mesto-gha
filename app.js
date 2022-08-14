const express = require('express');
const mongoose = require('mongoose');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '62f79073a38cdec69dd26f60',
  };

  next();
});

app.use(express.json());
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use((_, res) => {
  res.status(NotFoundError).send({ message: 'Страница не найдена' });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  app.listen(PORT, () => {
    console.log(`Поключён ${PORT} порт`);
  });
}

main();
