import 'dotenv/config';
import express from 'express';
import "reflect-metadata"
import { initializeDataSource } from './config/database';
import userRoutes from './features/user/routes/UserRoutes';

const app = express();
app.use(express.json());
const port = Number(process.env.PORT) || 3000;

app.use('/api/users', userRoutes);

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