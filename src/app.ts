import 'dotenv/config';
import express from 'express';
import "reflect-metadata"

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});