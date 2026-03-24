import 'dotenv/config';
import express from 'express';
import "reflect-metadata"
import { initializeDataSource } from './config/database';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Khởi tạo database và start server
initializeDataSource().then(() => {
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
}).catch(error => {
  console.error("Failed to start app:", error);
  process.exit(1);
});